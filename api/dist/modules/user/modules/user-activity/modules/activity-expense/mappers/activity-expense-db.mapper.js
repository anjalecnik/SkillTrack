"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityExpenseDBMapper = void 0;
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../../utils/types/enums/user-activity.enum");
class ActivityExpenseDBMapper {
    static createActivityRequest(createActivityRequest) {
        const activityRequest = {
            userId: createActivityRequest.userId,
            reportedByUserId: createActivityRequest.reportedByUserId,
            activityType: createActivityRequest.activityType,
            valueInEuro: createActivityRequest.valueInEuro,
            isPaidWithCompanyCard: createActivityRequest.isPaidWithCompanyCard,
            dateStart: createActivityRequest.dateStart,
            description: createActivityRequest.description ?? undefined,
            projectId: createActivityRequest.projectId ?? undefined,
            fileName: createActivityRequest.fileName ?? undefined,
            fileUrl: createActivityRequest.fileUrl ?? undefined,
            status: user_activity_status_enum_1.UserActivityStatus.PendingApproval
        };
        const activities = [
            {
                userId: createActivityRequest.userId,
                reportedByUserId: createActivityRequest.reportedByUserId,
                activityType: user_activity_enum_1.UserActivityType.Expense,
                date: createActivityRequest.dateStart,
                status: user_activity_status_enum_1.UserActivityStatus.PendingApproval
            }
        ];
        return { activityRequest, activities };
    }
}
exports.ActivityExpenseDBMapper = ActivityExpenseDBMapper;
//# sourceMappingURL=activity-expense-db.mapper.js.map