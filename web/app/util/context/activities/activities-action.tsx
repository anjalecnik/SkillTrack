import {
  IPlanAbsenceCreateReq,
  IBusinessTripActivityReq,
  IEmployeeParams,
} from "~/types";
import {
  PlanAbsenceSubmissionType,
  BusinessTripSubmissionType,
} from "~/schemas";
import { ActivityClient } from "~/clients";
import { formatDate } from "~/util";

export async function createAbsencePlanActivity(
  employeeParams: IEmployeeParams,
  activitySubmission: PlanAbsenceSubmissionType
) {
  const { dateStart, dateEnd, activityType, description } = activitySubmission;

  const reportedActivity: IPlanAbsenceCreateReq = {
    dateStart: formatDate(dateStart, "DD.MM.YYYY"),
    dateEnd: formatDate(dateEnd, "DD.MM.YYYY"),
    activityType,
    description: description,
  };

  await ActivityClient.createActivity(employeeParams, reportedActivity);
}

export async function createBusinessTripActivity(
  employeeParams: IEmployeeParams,
  activitySubmission: BusinessTripSubmissionType
) {
  const {
    activityType,
    dateStart,
    dateEnd,
    projectId,
    description,
    distanceInKM,
    location,
  } = activitySubmission;

  const reportedActivity: IBusinessTripActivityReq = {
    dateStart: formatDate(dateStart, "DD.MM.YYYY"),
    dateEnd: formatDate(dateEnd, "DD.MM.YYYY"),
    activityType,
    projectId,
    description,
    distanceInKM,
    location,
  };

  await ActivityClient.createActivity(employeeParams, reportedActivity);
}

export async function updateBusinessTripActivity(
  employeeParams: IEmployeeParams,
  activityRequestId: number,
  activitySubmission: BusinessTripSubmissionType
) {
  const {
    activityType,
    dateStart,
    dateEnd,
    projectId,
    description,
    distanceInKM,
    location,
  } = activitySubmission;

  const updatedActivity: IBusinessTripActivityReq = {
    dateStart: formatDate(dateStart, "DD.MM.YYYY"),
    dateEnd: formatDate(dateEnd, "DD.MM.YYYY"),
    activityType,
    projectId,
    description,
    distanceInKM,
    location,
  };
  await ActivityClient.updateActivity(
    employeeParams,
    activityRequestId,
    updatedActivity
  );
}
