"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkPositionModule = void 0;
const common_1 = require("@nestjs/common");
const work_position_controller_1 = require("./controllers/work-position.controller");
const work_position_repository_1 = require("./repository/work-position.repository");
const work_position_service_1 = require("./services/work-position.service");
const work_position_entity_1 = require("../../libs/db/entities/work-position.entity");
const typeorm_1 = require("@nestjs/typeorm");
let WorkPositionModule = class WorkPositionModule {
};
exports.WorkPositionModule = WorkPositionModule;
exports.WorkPositionModule = WorkPositionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([work_position_entity_1.WorkPositionEntity])],
        controllers: [work_position_controller_1.WorkPositionAdminHubController],
        providers: [work_position_service_1.WorkPositionService, work_position_repository_1.WorkPositionRepository],
        exports: [work_position_service_1.WorkPositionService]
    })
], WorkPositionModule);
//# sourceMappingURL=work-position.module.js.map