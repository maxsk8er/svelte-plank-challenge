<script>
  const handleStartClick = () => {
    console.log('handleStartClick');
  };
</script>

<section>
  <button on:click={handleStartClick}>Start Challenge</button>
</section>

<style type="text/scss">
  button {
    background-color: #e0f2fe;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 0.375rem;
    &:hover {
      background-color: #bfdbfe;
    }
  }
</style>
