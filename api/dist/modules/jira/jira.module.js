"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraModule = void 0;
const common_1 = require("@nestjs/common");
const jira_admin_hub_controller_1 = require("./controllers/jira-admin-hub.controller");
const jira_service_1 = require("./services/jira.service");
let JiraModule = class JiraModule {
};
exports.JiraModule = JiraModule;
exports.JiraModule = JiraModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [jira_admin_hub_controller_1.JiraAdminHubController],
        providers: [jira_service_1.JiraService],
        exports: [jira_service_1.JiraService]
    })
], JiraModule);
//# sourceMappingURL=jira.module.js.map