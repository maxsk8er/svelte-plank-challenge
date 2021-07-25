<script lang="ts">
  import CreateChallenge from './components/CreateChallenge.svelte';
  import StartChallenge from './components/StartChallenge.svelte';
</script>

<main>
	<StartChallenge />
  <CreateChallenge />
</main>

<style type="text/scss">
  main {
    width: 100%;
    // height: 70vh;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
		flex-direction: column;
  }
</style>
