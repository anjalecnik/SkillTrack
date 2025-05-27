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
exports.ActivityBusinessTripService = void 0;
const common_1 = require("@nestjs/common");
const activity_shared_db_mapper_1 = require("../../activity-shared/mappers/activity-shared-db.mapper");
const activity_shared_service_1 = require("../../activity-shared/services/activity-shared.service");
const activity_shared_request_actions_service_1 = require("../../activity-shared/services/activity-shared-request-actions.service");
const activity_business_trip_db_mapper_1 = require("../mappers/activity-business-trip-db.mapper");
const activity_business_trip_repository_1 = require("../repository/activity-business-trip.repository");
const activity_business_trip_validation_service_1 = require("../services/activity-business-trip-validation.service");
const user_activity_request_helper_1 = require("../../../../../../../utils/helpers/user-activity-request.helper");
const activity_request_type_helper_1 = require("../../../../../../../utils/helpers/activity-request-type.helper");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
let ActivityBusinessTripService = class ActivityBusinessTripService {
    activitySharedService;
    activityBusinessTripValidationService;
    activityBusinessTripRepository;
    activitySharedRequestActionsService;
    constructor(activitySharedService, activityBusinessTripValidationService, activityBusinessTripRepository, activitySharedRequestActionsService) {
        this.activitySharedService = activitySharedService;
        this.activityBusinessTripValidationService = activityBusinessTripValidationService;
        this.activityBusinessTripRepository = activityBusinessTripRepository;
        this.activitySharedRequestActionsService = activitySharedRequestActionsService;
    }
    async createActivityRequest(userInvoker, activityBusinessTripCreateRequest) {
        const assignedUserWorkHours = await this.activitySharedService.getUserExpectedWorkHours();
        const dates = await this.activitySharedService.getDatesFromRange({
            ...activityBusinessTripCreateRequest,
            dateStart: activityBusinessTripCreateRequest.dateStart,
            dateEnd: activityBusinessTripCreateRequest.dateEnd
        });
        const { activityRequest, activities } = activity_business_trip_db_mapper_1.ActivityBusinessTripDBMapper.createActivityRequest(activityBusinessTripCreateRequest, dates, assignedUserWorkHours);
        const activityBusinessTripEntity = await this.activityBusinessTripRepository.createActivityRequest(activityRequest, activities);
        return this.enrichActivityRequest(userInvoker.user.id, activityBusinessTripEntity);
    }
    async updateActivityRequest(userInvoker, activityRequestBusinessTripUpdateRequest) {
        const { id, userId } = activityRequestBusinessTripUpdateRequest;
        const existingActivityRequest = await this.activitySharedService.getActivityRequestWithActivitiesOrFail({ id, userId });
        const existingActivityRequestWithActivities = user_activity_request_helper_1.UserActivityRequestHelper.validateActivitiesRelation(existingActivityRequest);
        const { dates } = await this.getUpdateDates(activityRequestBusinessTripUpdateRequest, existingActivityRequest);
        const assignedUserWorkHours = await this.activitySharedService.getUserExpectedWorkHours();
        const { activities } = activity_business_trip_db_mapper_1.ActivityBusinessTripDBMapper.updateActivityRequest(activityRequestBusinessTripUpdateRequest, dates, assignedUserWorkHours);
        const activityBusinessTripEntity = await this.activityBusinessTripRepository.updateActivityRequest(activityRequestBusinessTripUpdateRequest, existingActivityRequestWithActivities.userActivities, activities);
        return this.enrichActivityRequest(userInvoker.user.id, activityBusinessTripEntity);
    }
    async cancelActivityRequest(userInvoker, activityBusinessTripCancelRequest) {
        const activityRequestBusinessTripEntity = await this.activityBusinessTripValidationService.preCancelTransformValidation(activityBusinessTripCancelRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.cancelActivity(activityBusinessTripCancelRequest, activityRequestBusinessTripEntity.userActivities ?? []);
        this.activityBusinessTripValidationService.preCancelSaveValidation(activityRequestBusinessTripEntity, activityRequest);
        const canceledActivityBusinessTripEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily);
        const canceledActivityBusinessTrips = canceledActivityBusinessTripEntity.userActivities ?? [];
        return this.enrichActivityRequest(userInvoker.user.id, canceledActivityBusinessTripEntity);
    }
    async reviewActivityRequest(userInvoker, activityBusinessTripReviewRequest) {
        const activityRequestBusinessTripEntity = await this.activityBusinessTripValidationService.preReviewTransformValidation(activityBusinessTripReviewRequest);
        const { activityRequest, activityDaily } = activity_shared_db_mapper_1.ActivitySharedDBMapper.reviewActivity(activityBusinessTripReviewRequest, activityRequestBusinessTripEntity.userActivities);
        this.activityBusinessTripValidationService.preReviewSaveValidation(activityRequestBusinessTripEntity, activityRequest);
        const reviewedActivityBusinessTripEntity = await this.activitySharedService.reviewActivityRequest(activityRequest, activityDaily);
        return this.enrichActivityRequest(userInvoker.user.id, reviewedActivityBusinessTripEntity);
    }
    async enrichActivityRequest(userInvoker, activityRequest, subordinateIds = []) {
        const activityRequestTypeSafe = activity_request_type_helper_1.ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, user_activity_enum_1.UserActivityType.BusinessTrip);
        const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequestTypeSafe, subordinateIds);
        return {
            ...activityRequestTypeSafe,
            actions
        };
    }
    async getUpdateDates(activityRequestBusinessTripUpdateRequest, existingActivityRequest) {
        const dateStartUpdating = activityRequestBusinessTripUpdateRequest.dateStart;
        const dateEndUpdating = activityRequestBusinessTripUpdateRequest.dateEnd;
        const dateStartExisting = existingActivityRequest.dateStart;
        const dateEndExisting = existingActivityRequest.dateEnd;
        const dateStart = dateStartUpdating ? dateStartUpdating : dateStartExisting;
        const dateEnd = dateEndUpdating ? dateEndUpdating : dateEndExisting;
        const dateStartAdjustUnassigned = dateStartUpdating && dateStartUpdating < dateStartExisting ? dateStartUpdating : dateStartExisting;
        const dateEndAdjustUnassigned = dateEndUpdating && dateEndUpdating > dateEndExisting ? dateEndUpdating : dateEndExisting;
        const dates = await this.activitySharedService.getDatesFromRange({
            ...activityRequestBusinessTripUpdateRequest,
            dateStart: dateStart,
            dateEnd: dateEnd
        });
        const datesAdjustUnassigned = await this.activitySharedService.getDatesFromRange({
            ...activityRequestBusinessTripUpdateRequest,
            dateStart: dateStartAdjustUnassigned,
            dateEnd: dateEndAdjustUnassigned
        });
        return {
            dates,
            datesAdjustUnassigned,
            dateStart,
            dateEnd
        };
    }
};
exports.ActivityBusinessTripService = ActivityBusinessTripService;
exports.ActivityBusinessTripService = ActivityBusinessTripService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_shared_service_1.ActivitySharedService,
        activity_business_trip_validation_service_1.ActivityBusinessTripValidationService,
        activity_business_trip_repository_1.ActivityBusinessTripRepository,
        activity_shared_request_actions_service_1.ActivitySharedRequestActionsService])
], ActivityBusinessTripService);
//# sourceMappingURL=activity-business-trip.service.js.map