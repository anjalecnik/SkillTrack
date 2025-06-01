"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacationHelper = void 0;
const date_helper_1 = require("./date.helper");
class VacationHelper {
    static calculateUsedVacation(oldYearVacation, currentYearVacation) {
        const upcomingDays = this.getUpcomingDays(oldYearVacation, currentYearVacation);
        const { oldVacation, currentVacation } = this.getAllVacations(oldYearVacation, currentYearVacation);
        return {
            old: oldVacation,
            new: currentVacation,
            total: {
                assignedDays: oldVacation.assignedDays + currentVacation.assignedDays,
                usedDays: oldVacation.usedDays + currentVacation.usedDays,
                availableDays: oldVacation.availableDays + currentVacation.availableDays
            },
            upcoming: upcomingDays
        };
    }
    static getAllVacations(oldYearVacation, currentYearVacation) {
        const oldVacation = this.getVacation(oldYearVacation);
        const currentVacation = this.getVacation(currentYearVacation);
        const expirationDate = new Date(`${currentYearVacation?.vacationContract.year}-${currentYearVacation?.vacationContract.oldVacationExpiration}`);
        const eligibleActivities = currentYearVacation?.vacationContract.vacations?.filter(vacation => {
            return date_helper_1.DateHelper.isDateAfterOrEqualDate(new Date(vacation.date), expirationDate);
        }) ?? [];
        const eligibleActivitiesCount = eligibleActivities.length;
        if (oldVacation.availableDays > 0 && eligibleActivitiesCount > 0) {
            const adjustment = Math.min(oldVacation.availableDays, eligibleActivitiesCount);
            oldVacation.availableDays -= adjustment;
            oldVacation.usedDays += adjustment;
            currentVacation.usedDays -= adjustment;
            currentVacation.availableDays += adjustment;
        }
        return { oldVacation, currentVacation };
    }
    static getVacation(vacation) {
        if (!vacation) {
            return {
                assignedDays: 0,
                usedDays: 0,
                availableDays: 0
            };
        }
        return {
            assignedDays: vacation.vacationContract.assignedDays,
            usedDays: this.getUsedDays(vacation),
            availableDays: this.getAvailableDays(vacation)
        };
    }
    static getUsedDays(vacation) {
        const usedDays = vacation.vacationContract.vacations?.length ?? 0;
        const initialUsedDays = vacation.vacationContract.initialUsedDays ?? 0;
        return usedDays + initialUsedDays;
    }
    static getAvailableDays(vacation) {
        const usedDays = vacation.vacationContract.vacations?.length ?? 0;
        const initialUsedDays = vacation.vacationContract.initialUsedDays ?? 0;
        return vacation.vacationContract.assignedDays - (initialUsedDays + usedDays);
    }
    static getUpcomingDays(oldYearVacation, currentYearVacation) {
        const oldUpcommingDays = oldYearVacation?.upcomingVacationDays ?? 0;
        const newUpcommingDays = currentYearVacation?.upcomingVacationDays ?? 0;
        return oldUpcommingDays + newUpcommingDays;
    }
    static getOldVacationExpirationDate(vacation) {
        const referenceDate = date_helper_1.DateHelper.addWorkspaceOffset("Europe/Ljubljana");
        if (vacation?.oldVacationExpiration) {
            return date_helper_1.DateHelper.setDateOfCurrentYearFromMMDDFromat(vacation.oldVacationExpiration, referenceDate);
        }
        const currentYear = referenceDate.getFullYear();
        return new Date(currentYear, 11, 31);
    }
}
exports.VacationHelper = VacationHelper;
//# sourceMappingURL=vacation.helper.js.map