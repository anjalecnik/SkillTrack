import { Module } from "@nestjs/common"
import { JiraAdminHubController } from "./controllers/jira-admin-hub.controller"
import { JiraService } from "./services/jira.service"
import { JiraUserHubController } from "./controllers/jira-user-hub.controller"

@Module({
	imports: [],
	controllers: [JiraAdminHubController, JiraUserHubController],
	providers: [JiraService],
	exports: [JiraService]
})
export class JiraModule {}
