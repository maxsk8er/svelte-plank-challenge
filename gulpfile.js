let preprocessor = 'sass', // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
	fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const bssi = require('browsersync-ssi')
const ssi = require('ssi')
const webpack = require('webpack-stream')
const sass = require('gulp-sass')(require('sass'))
const sassglob = require('gulp-sass-glob')
const less = require('gulp-less')
const lessglob = require('gulp-less-glob')
const styl = require('gulp-stylus')
const stylglob = require("gulp-noop")
const cleancss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const rsync = require('gulp-rsync')
const del = require('del')

function browsersync() {
	browserSync.init({
		server: {
			baseDir: '_site/',
			middleware: bssi({ baseDir: '_site/', ext: '.html' })
		},
		ghostMode: { clicks: false },
		notify: false,
		open: false,
		online: true,
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
	})
}

function scripts() {
	// return src(['js/*.js', '!js/*.min.js'])
	return src(['js/app.js', 'js/svelte-bundle.js'])
    .pipe(
      webpack({
        mode: 'production',
        performance: { hints: false },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['@babel/env'],
                plugins: ['babel-plugin-root-import'],
              },
            },
          ],
        },
      })
    )
    .on('error', function handleError() {
      this.emit('end');
    })
    .pipe(rename('app.min.js'))
    .pipe(dest('js'))
    .pipe(dest('_site/js'))
    .pipe(browserSync.stream());
}

function styles() {
	return src([`styles/${preprocessor}/*.*`, `!styles/${preprocessor}/_*.*`])
		.pipe(eval(`${preprocessor}glob`)())
		.pipe(eval(preprocessor)())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest('css'))
		.pipe(dest('_site/css'))
		.pipe(browserSync.stream())
}

function images() {
	return src(['images/src/**/*'])
		.pipe(newer('images/dist'))
		.pipe(imagemin())
		.pipe(dest('images/dist'))
		.pipe(browserSync.stream())
}

// function buildcopy() {
// 	return src([
// 		'{app/js,app/css}/*.min.*',
// 		'app/images/**/*.*',
// 		'!app/images/src/**/*',
// 		'app/fonts/**/*'
// 	], { base: 'app/' })
// 		.pipe(dest('dist'))
// }

// async function buildhtml() {
// 	let includes = new ssi('app/', 'dist/', '/**/*.html')
// 	includes.compile()
// 	del('dist/parts', { force: true })
// }

// function cleandist() {
// 	return del('_site/**/*', { force: true })
// }

function deploy() {
	return src('_site/')
		.pipe(rsync({
			root: '_site/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			// clean: true, // Mirror copy with file deletion
			include: [/* '*.htaccess' */], // Included files to deploy,
			exclude: ['**/Thumbs.db', '**/*.DS_Store'],
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

function startwatch() {
	watch(`styles/${preprocessor}/**/*`, { usePolling: true }, styles)
	watch(`js/bundle.css`, { usePolling: true }, styles);
	watch(['js/**/*.js', '!js/**/*.min.js'], { usePolling: true }, scripts)
	//watch('images/src/**/*.{jpg,jpeg,png,webp,svg,gif}', { usePolling: true }, images)
	//watch(`**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
	watch('_site/**/*.html', { usePolling: true }).on('change', browserSync.reload)
}

exports.scripts = scripts
exports.styles = styles
exports.images = images
exports.deploy = deploy
exports.assets = series(scripts, styles, images)
// exports.build = series(cleandist, scripts, styles, images, buildcopy, buildhtml)
exports.build = series(scripts, styles, images)
exports.default = series(scripts, styles, images, parallel(browsersync, startwatch))
