declare class User {
    userId: number;
    firstName: string;
    lastName: string;
}
declare class EmbeddedProject {
    projectId: number;
    name: string;
}
declare class ProjectStatistics {
    _embedded: EmbeddedProject;
    daysOnProject: number;
    daysOffProject: number;
    businessTripsCount: number;
    dailyActivityCount: number;
    publicHolidayCount: number;
    sickLeaveCount: number;
    vacationCount: number;
}
declare class TotalStatistics {
    daysOnProject: number;
    daysOffProject: number;
    businessTripsCount: number;
    dailyActivityCount: number;
    publicHolidayCount: number;
    sickLeaveCount: number;
    vacationCount: number;
}
declare class EmbeddedUser {
    user: User;
}
declare class ProjectsWrapper {
    project: ProjectStatistics[];
}
export declare class UserStatistics {
    _embedded: EmbeddedUser;
    projects: ProjectsWrapper;
    totalUser: TotalStatistics;
}
export {};
