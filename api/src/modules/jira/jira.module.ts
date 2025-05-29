import { Module } from "@nestjs/common"
import { JiraAdminHubController } from "./controllers/jira-admin-hub.controller"
import { JiraService } from "./services/jira.service"

@Module({
	imports: [],
	controllers: [JiraAdminHubController],
	providers: [JiraService],
	exports: [JiraService]
})
export class JiraModule {}
