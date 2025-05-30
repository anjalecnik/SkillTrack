"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatistics = void 0;
const swagger_1 = require("@nestjs/swagger");
class User {
    userId;
    firstName;
    lastName;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User ID" }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User first name" }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User last name" }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
class EmbeddedProject {
    projectId;
    name;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project ID" }),
    __metadata("design:type", Number)
], EmbeddedProject.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project name" }),
    __metadata("design:type", String)
], EmbeddedProject.prototype, "name", void 0);
class ProjectStatistics {
    _embedded;
    daysOnProject;
    daysOffProject;
    businessTripsCount;
    dailyActivityCount;
    publicHolidayCount;
    sickLeaveCount;
    vacationCount;
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: EmbeddedProject, description: "Embedded project information" }),
    __metadata("design:type", EmbeddedProject)
], ProjectStatistics.prototype, "_embedded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Days on project" }),
    __metadata("design:type", Number)
], ProjectStatistics.prototype, "daysOnProject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Days off project" }),
    __metadata("design:type", Number)
], ProjectStatistics.prototype, "daysOffProject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of business trips" }),
    __metadata("design:type", Number)
], ProjectStatistics.prototype, "businessTripsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of daily activities" }),
    __metadata("design:type", Number)
], ProjectStatistics.prototype, "dailyActivityCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of public holidays" }),
    __metadata("design:type", Number)
], ProjectStatistics.prototype, "publicHolidayCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of sick leave instances" }),
    __metadata("design:type", Number)
], ProjectStatistics.prototype, "sickLeaveCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of vacation instances" }),
    __metadata("design:type", Number)
], ProjectStatistics.prototype, "vacationCount", void 0);
class TotalStatistics {
    daysOnProject;
    daysOffProject;
    businessTripsCount;
    dailyActivityCount;
    publicHolidayCount;
    sickLeaveCount;
    vacationCount;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total days on project" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "daysOnProject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total days off project" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "daysOffProject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of business trips" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "businessTripsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of daily activities" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "dailyActivityCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of public holidays" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "publicHolidayCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of sick leave instances" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "sickLeaveCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of vacation instances" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "vacationCount", void 0);
class EmbeddedUser {
    user;
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: User, description: "User data" }),
    __metadata("design:type", User)
], EmbeddedUser.prototype, "user", void 0);
class ProjectsWrapper {
    project;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ProjectStatistics,
        description: "Statistics for each project",
        isArray: true
    }),
    __metadata("design:type", Array)
], ProjectsWrapper.prototype, "project", void 0);
class UserStatistics {
    _embedded;
    projects;
    totalUser;
}
exports.UserStatistics = UserStatistics;
__decorate([
    (0, swagger_1.ApiProperty)({ type: EmbeddedUser, description: "Embedded user information" }),
    __metadata("design:type", EmbeddedUser)
], UserStatistics.prototype, "_embedded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProjectsWrapper }),
    __metadata("design:type", ProjectsWrapper)
], UserStatistics.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TotalStatistics, description: "Total statistics for the user" }),
    __metadata("design:type", TotalStatistics)
], UserStatistics.prototype, "totalUser", void 0);
//# sourceMappingURL=work-overview-user-statistics.response.js.map