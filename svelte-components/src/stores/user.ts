import { writable } from 'svelte/store';
import type challengesTypes from '../types/challengesTypes';

interface User {
  email: string;
  username: string;
  currentChallenge?: challengesTypes.ChallengeType;
}

const initialValue: User = {
  email: 'dev@test.com',
  username: 'sk8er',
};

export const user = writable<User>(
  JSON.parse(localStorage.getItem('user')) || initialValue
);

user.subscribe((value) => (localStorage.user = JSON.stringify(value)));
