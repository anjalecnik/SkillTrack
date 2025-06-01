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
exports.ActivityVirtualService = void 0;
const common_1 = require("@nestjs/common");
const date_helper_1 = require("../../../../../../../utils/helpers/date.helper");
const holiday_helper_1 = require("../../../../../../../utils/helpers/holiday.helper");
const user_virtual_activity_enum_1 = require("../../../../../../../utils/types/enums/user-virtual-activity.enum");
let ActivityVirtualService = class ActivityVirtualService {
    constructor() { }
    createVirtualActivity(date, holidays) {
        let activityType;
        const { isHoliday, holidayName } = holiday_helper_1.HolidayHelper.checkHoliday(holidays, date);
        if (isHoliday) {
            activityType = user_virtual_activity_enum_1.UserVirtualActivityType.Holiday;
        }
        else if (date_helper_1.DateHelper.isWeekend(date)) {
            activityType = user_virtual_activity_enum_1.UserVirtualActivityType.Weekend;
        }
        else if (date_helper_1.DateHelper.isWorkingDay(holidays, date)) {
            activityType = user_virtual_activity_enum_1.UserVirtualActivityType.Empty;
        }
        else {
            throw new Error("Unhandled date scenario");
        }
        return {
            date: date,
            activityType: activityType,
            holidayName: holidayName ?? undefined
        };
    }
};
exports.ActivityVirtualService = ActivityVirtualService;
exports.ActivityVirtualService = ActivityVirtualService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ActivityVirtualService);
//# sourceMappingURL=activity-virtual.service.js.map