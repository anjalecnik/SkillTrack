"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const utility_module_1 = require("./modules/utility/utility.module");
const db_module_1 = require("./libs/db/db.module");
const app_config_module_1 = require("./config/app-config.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_manager_1 = require("@nestjs/cache-manager");
const work_position_module_1 = require("./modules/work-position/work-position.module");
const project_module_1 = require("./modules/project/project.module");
const user_working_hours_module_1 = require("./modules/user/modules/user-working-hours/user-working-hours.module");
const jira_module_1 = require("./modules/jira/jira.module");
const activity_overview_module_1 = require("./modules/activity-overview/activity-overview.module");
const mail_module_1 = require("./modules/mail/mail.module");
const overview_module_1 = require("./modules/overview/overview.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 5,
                max: 100
            }),
            db_module_1.DbModule,
            app_config_module_1.AppConfigModule,
            mail_module_1.MailModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            activity_overview_module_1.ActivityOverviewModule,
            utility_module_1.UtilityModule,
            jira_module_1.JiraModule,
            work_position_module_1.WorkPositionModule,
            project_module_1.ProjectModule,
            user_working_hours_module_1.UserWorkingHoursModule,
            overview_module_1.OverviewModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map