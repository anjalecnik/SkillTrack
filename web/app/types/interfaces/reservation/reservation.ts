export interface IReservation {
  id: number;
  deskId: string;
  fromDateStart: string;
  toDateEnd: string;
  weeklyPlan: string;
  workspaceUserId: number;
}
