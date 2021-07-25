document.addEventListener('DOMContentLoaded', () => {
	// const links = document.querySelectorAll("a.page-scroll");

	// for (const link of links) {
	// 	link.addEventListener("click", clickHandler);
	// }

	// function clickHandler(e) {
	// 	e.preventDefault();
	// 	const href = this.getAttribute("href");
	// 	const offsetTop = document.querySelector(href).offsetTop;

	// 	scroll({
	// 		top: offsetTop,
	// 		behavior: "smooth"
	// 	});
	// }


	// const attr = document.querySelectorAll('a[href^="#"]');
	// attr.forEach(function (elem) {
	// 	elem.addEventListener('click', (e) => {
	// 		e.preventDefault();

	// 		let targetElem = document.querySelector(elem.getAttribute('href'));
	// 		let targetRange = targetElem.getBoundingClientRect().top;

	// 		let smoothScroll = (range) => {
	// 			let position = 0;
	// 			let progress = 0;
	// 			let easeInOutQuint = (time) => {
	// 				return time < .5 ?
	// 					16 * Math.pow(time, 5) :
	// 					1 - Math.pow(-2 * time + 2, 5) / 2;
	// 			};
	// 			let move = () => {
	// 				progress++;
	// 				position = range * easeInOutQuint(progress / 100);

	// 				window.scrollTo(0, position);

	// 				if (position < range) {
	// 					requestAnimationFrame(move);
	// 				}

	// 			};
	// 			requestAnimationFrame(move);
	// 		};
	// 		smoothScroll(targetRange);
	// 	})
	// })

	// STICKY NAV

	// const nav = document.querySelector('#main');
	// const topOfNav = nav.offsetTop;
	// const fixNav = () => {

	// 	if (window.scrollY >= topOfNav) {
	// 		document.body.style.paddingTop = nav.offsetHeight + "px";
	// 		document.body.classList.add('fixed-nav');
	// 	} else {
	// 		document.body.style.paddingTop = 0;
	// 		document.body.classList.remove('fixed-nav');
	// 	}
	// }

	// window.addEventListener('scroll', fixNav);
})
