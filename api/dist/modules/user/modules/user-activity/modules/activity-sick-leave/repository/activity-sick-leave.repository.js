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
exports.ActivitySickLeaveRepository = void 0;
const common_1 = require("@nestjs/common");
const user_activity_request_entity_1 = require("../../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../../libs/db/entities/user-activity.entity");
const master_data_source_service_1 = require("../../../../../../../libs/db/master-data-source.service");
const LOAD_RELATIONS = {
    userActivities: true,
    project: true,
    user: { workPosition: true }
};
let ActivitySickLeaveRepository = class ActivitySickLeaveRepository {
    masterDataSource;
    constructor(masterDataSource) {
        this.masterDataSource = masterDataSource;
    }
    async createActivityRequest(createSickLeave, createSickLeaveActivities) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const newActivityRequest = await activityRequestRepository.save({ ...createSickLeave });
            await activityRepository.save(createSickLeaveActivities.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })));
            return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS });
        });
    }
};
exports.ActivitySickLeaveRepository = ActivitySickLeaveRepository;
exports.ActivitySickLeaveRepository = ActivitySickLeaveRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [master_data_source_service_1.MasterDataSource])
], ActivitySickLeaveRepository);
//# sourceMappingURL=activity-sick-leave.repository.js.map