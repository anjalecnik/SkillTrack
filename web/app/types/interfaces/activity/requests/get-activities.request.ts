export interface IGetActivitiesRequest {
  userId: number;
  dateStart?: string;
  dateEnd?: string;
  absencesOnly?: boolean;
  forceShowDataForUserInParams?: boolean;
}
