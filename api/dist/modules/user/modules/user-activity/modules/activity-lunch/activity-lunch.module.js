"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLunchModule = void 0;
const common_1 = require("@nestjs/common");
const activity_lunch_service_1 = require("./services/activity-lunch.service");
const activity_lunch_repository_1 = require("./repository/activity-lunch.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_activity_request_entity_1 = require("../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../../libs/db/entities/user.entity");
const master_data_source_service_1 = require("../../../../../../libs/db/master-data-source.service");
let ActivityLunchModule = class ActivityLunchModule {
};
exports.ActivityLunchModule = ActivityLunchModule;
exports.ActivityLunchModule = ActivityLunchModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity])],
        providers: [activity_lunch_service_1.ActivityLunchService, activity_lunch_repository_1.ActivityLunchRepository, master_data_source_service_1.MasterDataSource],
        exports: [activity_lunch_service_1.ActivityLunchService]
    })
], ActivityLunchModule);
//# sourceMappingURL=activity-lunch.module.js.map