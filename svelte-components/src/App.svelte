<script lang="ts">
  import CreateChallenge from './components/CreateChallenge.svelte';
  import StartChallenge from './components/StartChallenge.svelte';
  import { user } from './stores/user';
  import { v4 as uuid } from 'uuid';
  import moment from 'moment';
  import type challengesTypes from './types/challengesTypes';

  const EMPTY = 'O';
  const COMPLETED = 'X';
  // const days = Object.fromEntries(
  //   Array.from({ length: 30 }, () => EMPTY).map((e, i) => [i, e])
  // );
  // const days = [...new Array(30)].map((i, idx) => {
  //   return {
  //     id: '123',
  //     nday: idx,
  //     date: 'test',
  //     goal: 20,
  //     isComplete: false,
  //   };
  // });
  const days: challengesTypes.ChallengeDayType[] = Array(30)
    .fill(null)
    .map((e, i) => {
      return {
        id: uuid(),
        isComplete: false,
        nday: i + 1,
        date: moment()
          .add(1 * i, 'day')
          .format('YYYY-MM-DD'),
        goal: 20,
        result: null,
      };
    });
  const handleNewChallenge = () => {
    const newChallenge: challengesTypes.ChallengeType = {
      id: uuid(),
      title: 'test',
      isComplete: false,
      challengeDays: days,
    };
    $user.currentChallenge = newChallenge;
  };
</script>

<p>{JSON.stringify($user)}</p>
<input bind:value={$user.email} />
<buton on:click|preventDefault={handleNewChallenge}>New Challenge</buton>
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
