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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityBusinessTripRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_activity_request_entity_1 = require("../../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../../libs/db/entities/user-activity.entity");
const master_data_source_service_1 = require("../../../../../../../libs/db/master-data-source.service");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const mail_service_1 = require("../../../../../../mail/services/mail.service");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const LOAD_RELATIONS = {
    userActivities: true,
    project: true,
    user: { workPosition: true }
};
let ActivityBusinessTripRepository = class ActivityBusinessTripRepository {
    masterDataSource;
    mailerService;
    activitySharedService;
    constructor(masterDataSource, mailerService, activitySharedService) {
        this.masterDataSource = masterDataSource;
        this.mailerService = mailerService;
        this.activitySharedService = activitySharedService;
    }
    async createActivityRequest(createBusinessTrip, createBusinessTripActivities) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const newActivityRequest = await activityRequestRepository.save({ ...createBusinessTrip });
            await activityRepository.save(createBusinessTripActivities.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })));
            const user = await this.activitySharedService.getUserById(newActivityRequest.userId);
            await this.mailerService.sendMail(`${user.name} ${user.surname}`, user_activity_enum_1.UserActivityType.BusinessTrip, user.manager?.email);
            return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS });
        });
    }
    async updateActivityRequest({ id, ...updateBusinessTrip }, deleteBusinessTripActivities, createBusinessTripActivities) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            await activityRequestRepository.update(id, { ...updateBusinessTrip, status: user_activity_status_enum_1.UserActivityStatus.PendingApproval });
            await activityRepository.delete({ id: (0, typeorm_1.In)(deleteBusinessTripActivities.map(activity => activity.id)) });
            await activityRepository.save(createBusinessTripActivities.map(activity => ({ ...activity, activityRequestId: id })));
            return activityRequestRepository.findOneOrFail({ where: { id }, relations: LOAD_RELATIONS });
        });
    }
};
exports.ActivityBusinessTripRepository = ActivityBusinessTripRepository;
exports.ActivityBusinessTripRepository = ActivityBusinessTripRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [master_data_source_service_1.MasterDataSource,
        mail_service_1.MailService,
        activity_shared_service_1.ActivitySharedService])
], ActivityBusinessTripRepository);
//# sourceMappingURL=activity-business-trip.repository.js.map