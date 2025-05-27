"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAssignedVacationMapper = void 0;
class UserAssignedVacationMapper {
    static mapUserAssignedVacationDetails(assignedVacation) {
        return {
            id: assignedVacation.id,
            year: assignedVacation.year,
            assignedDays: assignedVacation.assignedDays ?? undefined,
            oldVacationExpiration: assignedVacation.oldVacationExpiration ?? undefined,
            initialUsedDays: assignedVacation.initialUsedDays ?? undefined,
            initialDate: assignedVacation.initialDate ?? undefined,
            description: assignedVacation.description ?? undefined
        };
    }
}
exports.UserAssignedVacationMapper = UserAssignedVacationMapper;
//# sourceMappingURL=user-assigned-vacation.mapper.js.map