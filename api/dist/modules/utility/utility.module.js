"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityModule = void 0;
const common_1 = require("@nestjs/common");
const utility_service_1 = require("./services/utility.service");
const utility_repository_1 = require("./repository/utility.repository");
const typeorm_1 = require("@nestjs/typeorm");
const holiday_entity_1 = require("../../libs/db/entities/holiday.entity");
const project_entity_1 = require("../../libs/db/entities/project.entity");
const user_address_entity_1 = require("../../libs/db/entities/user-address.entity");
const user_entity_1 = require("../../libs/db/entities/user.entity");
let UtilityModule = class UtilityModule {
};
exports.UtilityModule = UtilityModule;
exports.UtilityModule = UtilityModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, project_entity_1.ProjectEntity, holiday_entity_1.HolidayEntity, user_address_entity_1.UserAddressEntity])],
        providers: [utility_service_1.UtilityService, utility_repository_1.UtilityRepository],
        exports: [utility_service_1.UtilityService]
    })
], UtilityModule);
//# sourceMappingURL=utility.module.js.map