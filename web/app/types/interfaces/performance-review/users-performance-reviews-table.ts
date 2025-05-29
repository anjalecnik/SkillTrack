export interface IPerformanceReview {
  id: number;
  answer1: number;
  answer2: number;
  answer3: boolean;
  answer4: boolean;
  score: number;
  quartal: string;
  year: number;
  activityId: number;
}

export interface IUsersPerformanceReviews {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  email: string;
  scores: IPerformanceReview[];
}
