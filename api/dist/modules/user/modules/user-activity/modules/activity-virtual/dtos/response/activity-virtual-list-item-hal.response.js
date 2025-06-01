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
exports.ActivityVirtualListItemHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_virtual_activity_enum_1 = require("../../../../../../../../utils/types/enums/user-virtual-activity.enum");
class ActivityVirtualListItemHalResponse {
    activityType;
    holidayName;
    date;
}
exports.ActivityVirtualListItemHalResponse = ActivityVirtualListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_virtual_activity_enum_1.UserVirtualActivityType.Empty, enum: user_virtual_activity_enum_1.UserVirtualActivityType }),
    __metadata("design:type", String)
], ActivityVirtualListItemHalResponse.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Marijino vnebovzetje" }),
    __metadata("design:type", String)
], ActivityVirtualListItemHalResponse.prototype, "holidayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityVirtualListItemHalResponse.prototype, "date", void 0);
//# sourceMappingURL=activity-virtual-list-item-hal.response.js.map