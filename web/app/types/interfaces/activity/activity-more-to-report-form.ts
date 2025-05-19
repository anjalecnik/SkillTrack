import { BusinessTripSubmissionType } from "~/schemas";
import { Dispatch, SetStateAction } from "react";
import { IProjectUserResponse, MoreToReportActivityType } from "~/types";

export interface IActivityMoreToReportForm
  extends Partial<BusinessTripSubmissionType> {
  date?: string;
  dateStart?: string;
  startTime?: string;
  employeeId?: number;
}

export interface MoreToReportEditRequestType {
  setIsRequestInfoDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setSelectedMoreToReportType: Dispatch<
    SetStateAction<MoreToReportActivityType>
  >;
  setDefaultMoreToReportValues: Dispatch<
    SetStateAction<IActivityMoreToReportForm | undefined>
  >;
  setIsMoreToReportDialogOpen: Dispatch<SetStateAction<boolean>>;
  setDefaultMoreToReportProject?: Dispatch<
    SetStateAction<IProjectUserResponse[]>
  >;
}
