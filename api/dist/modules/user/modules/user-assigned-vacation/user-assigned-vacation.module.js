"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAssignedVacationModule = void 0;
const common_1 = require("@nestjs/common");
const user_assigned_vacation_repository_1 = require("./repository/user-assigned-vacation.repository");
const user_assigned_vacation_service_1 = require("./services/user-assigned-vacation.service");
const user_vacation_assigned_entity_1 = require("../../../../libs/db/entities/user-vacation-assigned.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../../libs/db/entities/user.entity");
let UserAssignedVacationModule = class UserAssignedVacationModule {
};
exports.UserAssignedVacationModule = UserAssignedVacationModule;
exports.UserAssignedVacationModule = UserAssignedVacationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_vacation_assigned_entity_1.UserVacationAssignedEntity, user_entity_1.UserEntity])],
        providers: [user_assigned_vacation_service_1.UserAssignedVacationService, user_assigned_vacation_repository_1.UserAssignedVacationRepository],
        exports: [user_assigned_vacation_service_1.UserAssignedVacationService, user_assigned_vacation_repository_1.UserAssignedVacationRepository]
    })
], UserAssignedVacationModule);
//# sourceMappingURL=user-assigned-vacation.module.js.map