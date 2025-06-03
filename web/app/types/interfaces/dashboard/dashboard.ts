export interface MonthlyUserProductivity {
  thisYear: number[];
  lastYear: number[];
}

export interface PositionDistribution {
  cloud: number;
  database: number;
  other: number;
}

export interface DashboardStatistics {
  members: number;
  projects: number;
  taskProgress: number;
  positionDistribution: PositionDistribution;
}

export interface DashboardWorkingHoursStatistics {
  monthlyUserProductivity: MonthlyUserProductivity;
}
