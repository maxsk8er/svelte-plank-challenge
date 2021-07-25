namespace challengesTypes {
  export type ChallengeDayType = {
    id: string;
    isComplete: boolean;
    nday: number;
    date: string;
    goal: number;
    result: number | null;
  };

  export type ChallengeType = {
    title: string;
    id: string;
    isComplete: boolean;
    challengeDays: ChallengeDayType[];
  };

  export type AppStateType = {
    id: string;
    challenges: ChallengeType[];
    loading: boolean;
    error: null | string;
    page: number;
    hasMore: boolean;
  };
}

export default challengesTypes;
