import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { ActivityClient, RequestClient } from "~/clients";
import {
  IActivity,
  IActivityTableItem,
  IAddress,
  IWorkspaceData,
  IWorkspaceModuleActivity,
} from "~/types";
import { mapActivityResponseToTableActivities } from "~/mappers";
import { handleAxiosError } from "~/util";

interface ILoaderResponse {
  activities?: IActivityTableItem[];
  absences?: IActivity[];
  reportRestrictions?: IWorkspaceModuleActivity;
  workspaceAddresses?: IAddress[];
}

export async function getAbsences(
  loaderArgs: ClientLoaderFunctionArgs,
  workspaceUserAcc: IWorkspaceData,
  employeeId?: number
): Promise<ILoaderResponse | null> {
  try {
    const absencesResponse = await RequestClient.getRequests(loaderArgs, {
      userId: employeeId ? employeeId : workspaceUserAcc.id,
      absencesOnly: true,
    });
    return {
      activities: [],
      absences: absencesResponse?.requests,
    };
  } catch (e) {
    return handleAxiosError(e);
  }
}

export async function getActivities(
  loaderArgs: ClientLoaderFunctionArgs,
  isDateStartAscending: boolean,
  workspaceUserAcc: IWorkspaceData,
  employeeId?: number
): Promise<ILoaderResponse | null> {
  let activitiesResponse;
  try {
    activitiesResponse = await ActivityClient.getActivities(loaderArgs, {
      userId: employeeId ? employeeId : workspaceUserAcc.id,
    });
  } catch (e) {
    handleAxiosError(e);
  }

  try {
    const activities = activitiesResponse
      ? mapActivityResponseToTableActivities(
          activitiesResponse,
          isDateStartAscending
        )
      : undefined;

    return {
      activities,
      absences: [],
    };
  } catch (e) {
    return handleAxiosError(e);
  }
}
