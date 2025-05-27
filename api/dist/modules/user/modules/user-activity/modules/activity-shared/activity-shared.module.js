"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitySharedModule = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_repository_1 = require("./repository/activity-shared.repository");
const activity_shared_service_1 = require("./services/activity-shared.service");
const activity_shared_request_actions_service_1 = require("./services/activity-shared-request-actions.service");
const activity_shared_validation_service_1 = require("./services/activity-shared-validation.service");
const activity_shared_validation_collision_service_1 = require("./services/activity-shared-validation-collision.service");
const activity_shared_hierarchical_validation_service_1 = require("./services/activity-shared-hierarchical-validation.service");
const user_entity_1 = require("../../../../../../libs/db/entities/user.entity");
const user_activity_entity_1 = require("../../../../../../libs/db/entities/user-activity.entity");
const user_activity_request_entity_1 = require("../../../../../../libs/db/entities/user-activity-request.entity");
const typeorm_1 = require("@nestjs/typeorm");
const utility_service_1 = require("../../../../../utility/services/utility.service");
const project_entity_1 = require("../../../../../../libs/db/entities/project.entity");
const holiday_entity_1 = require("../../../../../../libs/db/entities/holiday.entity");
const utility_repository_1 = require("../../../../../utility/repository/utility.repository");
const user_address_repository_1 = require("../../../user-address/repository/user-address.repository");
const user_address_entity_1 = require("../../../../../../libs/db/entities/user-address.entity");
const user_address_service_1 = require("../../../user-address/services/user-address.service");
const master_data_source_service_1 = require("../../../../../../libs/db/master-data-source.service");
let ActivitySharedModule = class ActivitySharedModule {
};
exports.ActivitySharedModule = ActivitySharedModule;
exports.ActivitySharedModule = ActivitySharedModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity, project_entity_1.ProjectEntity, holiday_entity_1.HolidayEntity, user_address_entity_1.UserAddressEntity])],
        providers: [
            activity_shared_service_1.ActivitySharedService,
            activity_shared_validation_service_1.ActivitySharedValidationService,
            activity_shared_validation_collision_service_1.ActivitySharedValidationCollisionService,
            activity_shared_hierarchical_validation_service_1.ActivitySharedHierarchicalValidationService,
            activity_shared_request_actions_service_1.ActivitySharedRequestActionsService,
            activity_shared_repository_1.ActivitySharedRepository,
            utility_service_1.UtilityService,
            utility_repository_1.UtilityRepository,
            user_address_repository_1.UserAddressRepository,
            user_address_service_1.UserAddressService,
            master_data_source_service_1.MasterDataSource
        ],
        exports: [
            activity_shared_service_1.ActivitySharedService,
            activity_shared_validation_service_1.ActivitySharedValidationService,
            activity_shared_validation_collision_service_1.ActivitySharedValidationCollisionService,
            activity_shared_hierarchical_validation_service_1.ActivitySharedHierarchicalValidationService,
            activity_shared_request_actions_service_1.ActivitySharedRequestActionsService
        ]
    })
], ActivitySharedModule);
//# sourceMappingURL=activity-shared.module.js.map