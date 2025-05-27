"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitySharedValidationCollisionService = void 0;
const common_1 = require("@nestjs/common");
let ActivitySharedValidationCollisionService = class ActivitySharedValidationCollisionService {
    validateCollisions(collisionActivities, collisionRules) {
        this.validateCollisionForDay(collisionActivities, collisionRules);
    }
    validateCollisionForDay(collisionActivities, collisionRules) {
        if (collisionRules.collidingActivityOnDay === undefined)
            return;
        const rules = collisionRules.collidingActivityOnDay;
        const collisions = collisionActivities.filter(activity => rules.includes(activity.activityType));
        if (collisions.length <= 0)
            return;
        throw new common_1.BadRequestException(`You already reported activities on the selected days, cancel them in order to report.`, `Activity Already assigned for [${collisions
            .map(activity => {
            return `${activity.activityType}@${activity.date.toDateString()}`;
        })
            .toString()
            .replace(",", ", ")}]`);
    }
};
exports.ActivitySharedValidationCollisionService = ActivitySharedValidationCollisionService;
exports.ActivitySharedValidationCollisionService = ActivitySharedValidationCollisionService = __decorate([
    (0, common_1.Injectable)()
], ActivitySharedValidationCollisionService);
//# sourceMappingURL=activity-shared-validation-collision.service.js.map