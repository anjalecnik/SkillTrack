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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraAdminHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const jira_projects_response_1 = require("../dtos/response/jira-projects.response");
const jira_project_unassigned_issues_response_1 = require("../dtos/response/jira-project-unassigned-issues.response");
const jira_statistics_response_1 = require("../dtos/response/jira-statistics.response");
const jira_service_1 = require("../services/jira.service");
const jira_openai_suggestion_response_1 = require("../dtos/response/jira-openai-suggestion.response");
let JiraAdminHubController = class JiraAdminHubController {
    jiraService;
    constructor(jiraService) {
        this.jiraService = jiraService;
    }
    async getJiraProjects() {
        return this.jiraService.getJiraProjects();
    }
    async getJiraProjectUnassignedIssues(projectKey) {
        return this.jiraService.getJiraProjectUnassignedIssues(projectKey);
    }
    async getJiraProjectParticipants(projectKey) {
        return this.jiraService.getJiraProjectParticipantsAvailability(projectKey);
    }
    async getOpenAISuggestionForAsignee(projectKey, ticketId) {
        return this.jiraService.suggestBestAssigneeWithOpenAI(projectKey, ticketId);
    }
    async assignJiraTicket(ticketId, assigneId) {
        return this.jiraService.assignTicketToUser(ticketId, assigneId);
    }
};
exports.JiraAdminHubController = JiraAdminHubController;
__decorate([
    (0, common_1.Get)("/projects"),
    (0, common_1.UseGuards)(),
    (0, swagger_1.ApiOperation)({
        summary: "Return Jira projects"
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Jira projects", type: jira_projects_response_1.JiraProjectsResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JiraAdminHubController.prototype, "getJiraProjects", null);
__decorate([
    (0, common_1.Get)("/:projectKey/unassigned-issues"),
    (0, common_1.UseGuards)(),
    (0, swagger_1.ApiOperation)({
        summary: "Return Jira unassigned issues for project from params"
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Jira projects", type: jira_project_unassigned_issues_response_1.JiraProjectUnassignedIssuesResponse }),
    __param(0, (0, common_1.Param)("projectKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JiraAdminHubController.prototype, "getJiraProjectUnassignedIssues", null);
__decorate([
    (0, common_1.Get)("/:projectKey"),
    (0, common_1.UseGuards)(),
    (0, swagger_1.ApiOperation)({
        summary: "Return Jira project participants and their availability"
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Jira statistics", type: jira_statistics_response_1.JiraStatisticsResponse }),
    __param(0, (0, common_1.Param)("projectKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JiraAdminHubController.prototype, "getJiraProjectParticipants", null);
__decorate([
    (0, common_1.Get)("/openai/:projectKey/:ticketId"),
    (0, common_1.UseGuards)(),
    (0, swagger_1.ApiOperation)({
        summary: "Return OpenAI suggestion for assignee"
    }),
    (0, swagger_1.ApiOkResponse)({ description: "OpenAI suggestion", type: jira_openai_suggestion_response_1.JiraOpenAISuggestionResponse }),
    __param(0, (0, common_1.Param)("projectKey")),
    __param(1, (0, common_1.Param)("ticketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JiraAdminHubController.prototype, "getOpenAISuggestionForAsignee", null);
__decorate([
    (0, common_1.Post)("/:ticketId/:assigneId"),
    (0, common_1.UseGuards)(),
    (0, swagger_1.ApiOperation)({
        summary: "Assign ticket to Jira user"
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Jira statistics" }),
    __param(0, (0, common_1.Param)("ticketId")),
    __param(1, (0, common_1.Param)("assigneId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JiraAdminHubController.prototype, "assignJiraTicket", null);
exports.JiraAdminHubController = JiraAdminHubController = __decorate([
    (0, common_1.Controller)(`/${constants_1.ROUTE_ADMIN_HUB}/${constants_1.ROUTE_JIRA}`),
    (0, swagger_1.ApiTags)(`${constants_1.API_TAG_JIRA}`),
    __metadata("design:paramtypes", [jira_service_1.JiraService])
], JiraAdminHubController);
//# sourceMappingURL=jira-admin-hub.controller.js.map