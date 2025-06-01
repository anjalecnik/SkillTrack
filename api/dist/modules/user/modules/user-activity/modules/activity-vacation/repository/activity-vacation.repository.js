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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityVacationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_activity_request_entity_1 = require("../../../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../../../libs/db/entities/user-activity.entity");
const user_vacation_assigned_entity_1 = require("../../../../../../../libs/db/entities/user-vacation-assigned.entity");
const master_data_source_service_1 = require("../../../../../../../libs/db/master-data-source.service");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const mail_service_1 = require("../../../../../../mail/services/mail.service");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
const LOAD_RELATIONS = {
    userActivities: true,
    project: true,
    user: { workPosition: true }
};
let ActivityVacationRepository = class ActivityVacationRepository {
    userVacationAssignedRepository;
    masterDataSource;
    mailerService;
    activitySharedService;
    constructor(userVacationAssignedRepository, masterDataSource, mailerService, activitySharedService) {
        this.userVacationAssignedRepository = userVacationAssignedRepository;
        this.masterDataSource = masterDataSource;
        this.mailerService = mailerService;
        this.activitySharedService = activitySharedService;
    }
    async createActivityRequest(createVacation, createVacationActivities) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const activityRequestRepository = entityManager.getRepository(user_activity_request_entity_1.UserActivityRequestEntity);
            const activityRepo = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
            const newActivityRequest = await activityRequestRepository.save({ ...createVacation });
            await activityRepo.save(createVacationActivities.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })));
            const user = await this.activitySharedService.getUserById(newActivityRequest.userId);
            await this.mailerService.sendMail(`${user.name} ${user.surname}`, user_activity_enum_1.UserActivityType.Vacation, user.manager?.email);
            return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS });
        });
    }
    async getUserAssignedVacation(userId, year) {
        return ((await this.userVacationAssignedRepository
            .createQueryBuilder("userVacationAssigned")
            .leftJoinAndSelect("userVacationAssigned.vacations", "vacation", "vacation.status IN (:...status)", {
            status: [user_activity_status_enum_1.UserActivityStatus.Approved, user_activity_status_enum_1.UserActivityStatus.PendingApproval]
        })
            .where({ userId, year })
            .getOne()) ?? undefined);
    }
};
exports.ActivityVacationRepository = ActivityVacationRepository;
exports.ActivityVacationRepository = ActivityVacationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_vacation_assigned_entity_1.UserVacationAssignedEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        master_data_source_service_1.MasterDataSource,
        mail_service_1.MailService,
        activity_shared_service_1.ActivitySharedService])
], ActivityVacationRepository);
//# sourceMappingURL=activity-vacation.repository.js.map