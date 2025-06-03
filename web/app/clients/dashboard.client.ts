import {
  DashboardStatistics,
  DashboardWorkingHoursStatistics,
} from "~/types/interfaces/dashboard";
import { privateClient } from "~/util/api";

export class DashboardClient {
  static async getDashboardStatistics(): Promise<DashboardStatistics> {
    const { data } = await privateClient.get<DashboardStatistics>(`/overview`);
    return data;
  }

  static async getDashboardWorkingHoursStatistics(): Promise<DashboardWorkingHoursStatistics> {
    const { data } = await privateClient.get<DashboardWorkingHoursStatistics>(
      `/overview/working-hours`
    );
    return data;
  }
}
