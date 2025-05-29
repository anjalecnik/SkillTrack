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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraService = void 0;
const common_1 = require("@nestjs/common");
const jira_client_1 = __importDefault(require("jira-client"));
let JiraService = class JiraService {
    jira;
    constructor() {
        this.jira = new jira_client_1.default({
            protocol: "https",
            host: "anjaslecnik.atlassian.net",
            username: "anjas.lecnik@gmail.com",
            password: process.env.JIRA_API_TOKEN,
            apiVersion: "2",
            strictSSL: true
        });
    }
    async getJiraProjects() {
        const projects = await this.jira.listProjects();
        return projects.map((project) => ({
            key: project.key,
            name: project.name
        }));
    }
    async getJiraProjectUnassignedIssues(projectKey) {
        const jql = `project = "${projectKey}" AND assignee IS EMPTY`;
        const issues = await this.jira.searchJira(jql, {
            fields: ["summary"],
            maxResults: 100
        });
        return issues.issues.map((issue) => ({
            key: issue.key,
            summary: issue.fields.summary
        }));
    }
    async getJiraProjectParticipantsAvailability(projectKey) {
        const jql = `project = "${projectKey}" AND assignee IS NOT EMPTY`;
        const response = await this.jira.searchJira(jql, {
            fields: ["assignee", "status"],
            maxResults: 100
        });
        const userStats = new Map();
        for (const issue of response.issues) {
            const assignee = issue.fields.assignee;
            const status = issue.fields.status?.name;
            if (!assignee || !status)
                continue;
            const key = assignee.accountId;
            if (!userStats.has(key)) {
                userStats.set(key, {
                    user: assignee.displayName,
                    accountId: assignee.accountId,
                    todo: 0,
                    inProgress: 0,
                    done: 0,
                    totalDoneHistory: 0,
                    totalAssigned: 0
                });
            }
            const stats = userStats.get(key);
            const normalized = status.trim().toLowerCase();
            if (normalized.includes("to do"))
                stats.todo++;
            else if (normalized.includes("in progress"))
                stats.inProgress++;
            else if (normalized.includes("done")) {
                stats.done++;
                stats.totalDoneHistory++;
            }
            stats.totalAssigned = stats.todo + stats.inProgress + stats.done;
        }
        return Array.from(userStats.values()).sort((a, b) => a.totalAssigned - b.totalAssigned);
    }
    async assignTicketToUser(ticketId, accountId) {
        try {
            await this.jira.updateAssigneeWithId(ticketId, accountId);
        }
        catch (error) {
            console.error(`Failed to assign ticket ${ticketId} to ${accountId}`, error);
            throw new Error("Jira ticket assignment failed");
        }
    }
};
exports.JiraService = JiraService;
exports.JiraService = JiraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JiraService);
//# sourceMappingURL=jira.service.js.map