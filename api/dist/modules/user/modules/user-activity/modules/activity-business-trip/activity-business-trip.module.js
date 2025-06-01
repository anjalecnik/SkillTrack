"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityBusinessTripModule = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_module_1 = require("../activity-shared/activity-shared.module");
const activity_business_trip_repository_1 = require("./repository/activity-business-trip.repository");
const activity_business_trip_service_1 = require("./services/activity-business-trip.service");
const activity_business_trip_validation_service_1 = require("./services/activity-business-trip-validation.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_activity_request_entity_1 = require("../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../../libs/db/entities/user.entity");
const master_data_source_service_1 = require("../../../../../../libs/db/master-data-source.service");
const mail_service_1 = require("../../../../../mail/services/mail.service");
let ActivityBusinessTripModule = class ActivityBusinessTripModule {
};
exports.ActivityBusinessTripModule = ActivityBusinessTripModule;
exports.ActivityBusinessTripModule = ActivityBusinessTripModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_activity_entity_1.UserActivityEntity, user_activity_request_entity_1.UserActivityRequestEntity]), activity_shared_module_1.ActivitySharedModule],
        providers: [activity_business_trip_service_1.ActivityBusinessTripService, activity_business_trip_validation_service_1.ActivityBusinessTripValidationService, activity_business_trip_repository_1.ActivityBusinessTripRepository, master_data_source_service_1.MasterDataSource, mail_service_1.MailService],
        exports: [activity_business_trip_service_1.ActivityBusinessTripService]
    })
], ActivityBusinessTripModule);
//# sourceMappingURL=activity-business-trip.module.js.map