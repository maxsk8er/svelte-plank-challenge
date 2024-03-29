import { CREATE_CHALLENGE, TOGGLE_DAY } from './userActions';

const EMPTY = 'O';
const COMPLETED = 'X';

const days = Object.fromEntries(
  Array.from({ length: 30 }, () => EMPTY).map((e, i) => [i, e])
);

export const challengesReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHALLENGE: {
      const newChallengeId = Object.keys(state).length;
      const { name } = action.payload;
      return { ...state, ...{ [newChallengeId]: { name, days } } };
    }
    case TOGGLE_DAY: {
      const { challengeId, day } = action.payload;
      const challenge = state[challengeId];
      const updatedChallenge = {
        ...challenge,
        days: {
          ...challenge.days,
          ...{ [day]: challenge.days[day] === COMPLETED ? EMPTY : COMPLETED },
        },
      };
      return { ...state, ...{ [challengeId]: updatedChallenge } };
    }
    default:
      return state;
  }
};
