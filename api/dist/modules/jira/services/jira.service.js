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
const openai_1 = __importDefault(require("openai"));
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
    async getUserTicketHistory(projectKey) {
        const jql = `project = "${projectKey}" AND statusCategory = Done AND assignee IS NOT EMPTY ORDER BY updated DESC`;
        const response = await this.jira.searchJira(jql, {
            fields: ["summary", "description", "assignee"],
            maxResults: 100
        });
        const userMap = new Map();
        for (const issue of response.issues) {
            const assignee = issue.fields.assignee;
            if (!assignee)
                continue;
            const key = assignee.accountId;
            const description = issue.fields.description?.content?.map((c) => c.content?.map((p) => p.text).join("")).join("\n") ||
                issue.fields.description ||
                issue.fields.summary ||
                "No description";
            if (!userMap.has(key)) {
                userMap.set(key, {
                    name: assignee.displayName,
                    accountId: assignee.accountId,
                    pastDescriptions: []
                });
            }
            const user = userMap.get(key);
            if (user.pastDescriptions.length < 5) {
                user.pastDescriptions.push(description);
            }
        }
        return Array.from(userMap.values());
    }
    async getTicketDetails(ticketId) {
        const issue = await this.jira.findIssue(ticketId, "summary,description");
        const description = issue.fields.description?.content?.map((c) => c.content?.map((p) => p.text).join("")).join("\n") ||
            issue.fields.description ||
            issue.fields.summary ||
            "No description";
        return {
            summary: issue.fields.summary,
            description
        };
    }
    async suggestBestAssigneeWithOpenAI(projectKey, ticketId) {
        const newTicket = await this.getTicketDetails(ticketId);
        const users = await this.getUserTicketHistory(projectKey);
        const prompt = `
		We have a new Jira ticket:
		Summary: ${newTicket.summary}
		Description: ${newTicket.description}
		
		Below are users and the descriptions of their past completed tickets:
		
		${users.map(user => `- ${user.name}:\n${user.pastDescriptions.slice(0, 3).join("\n")}`).join("\n\n")}
		
		Based on past experience, who is the most suitable person to assign this new ticket to? Reply only with their name and a short reason.
		
		Please reply in the following format:
		Name: [Full name]
		Reason: [Brief explanation]
		`;
        const completion = await new openai_1.default({ apiKey: process.env.OPENAI_API_KEY }).chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an expert in work delegation and team optimization." },
                { role: "user", content: prompt }
            ],
            temperature: 0.4
        });
        const content = completion.choices[0].message?.content?.trim() || "";
        const nameMatch = content.match(/Name:\s*(.+)/i);
        const reasonMatch = content.match(/Reason:\s*(.+)/i);
        const name = nameMatch?.[1]?.trim() || "";
        const reason = reasonMatch?.[1]?.trim() || "";
        return { name, reason };
    }
};
exports.JiraService = JiraService;
exports.JiraService = JiraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JiraService);
//# sourceMappingURL=jira.service.js.map