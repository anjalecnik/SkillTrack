export interface IGetActivitiesRequest {
  userId: number;
  dateStart?: string;
  dateEnd?: string;
  absencesOnly?: boolean;
  forceShowDataForWorkspaceUserInParams?: boolean;
}
