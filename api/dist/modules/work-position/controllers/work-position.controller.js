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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkPositionAdminHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const guards_1 = require("../../../utils/guards");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const work_position_service_1 = require("../services/work-position.service");
const work_position_pagination_list_response_1 = require("../dtos/response/work-position-pagination-list.response");
const work_position_pagination_filter_request_1 = require("../dtos/request/work-position-pagination-filter.request");
const work_position_mapper_1 = require("../mappers/work-position.mapper");
const decorators_1 = require("../../../utils/decorators");
const work_position_list_item_response_1 = require("../dtos/response/work-position-list-item.response");
const work_position_patch_request_1 = require("../dtos/request/work-position-patch.request");
const work_position_create_request_1 = require("../dtos/request/work-position-create.request");
let WorkPositionAdminHubController = class WorkPositionAdminHubController {
    workPositionService;
    constructor(workPositionService) {
        this.workPositionService = workPositionService;
    }
    async getWorkPositions(authPassport, filter) {
        const workPositions = await this.workPositionService.getWorkPositions({
            userId: authPassport.user.id,
            ...filter
        });
        return work_position_mapper_1.WorkPositionMapper.mapWorkPositionPaginationList(workPositions.data, workPositions.meta);
    }
    async getWorkPosition(workPositionId) {
        const workPositionEntity = await this.workPositionService.getWorkPosition(workPositionId);
        return work_position_mapper_1.WorkPositionMapper.mapWorkPositionListItem(workPositionEntity);
    }
    async createWorkPosition(authPassport, workPositionCreateRequest) {
        const workPositionEntity = await this.workPositionService.createWorkPosition({
            ...workPositionCreateRequest,
            createdByUserId: authPassport.user.id,
            updatedByUserId: authPassport.user.id
        });
        return work_position_mapper_1.WorkPositionMapper.mapWorkPositionListItem(workPositionEntity);
    }
    async patchWorkPosition(authPassport, workPositionId, workPositionPatchRequest) {
        const workPositionEntity = await this.workPositionService.patchWorkPosition({
            ...workPositionPatchRequest,
            id: workPositionId,
            updatedByUserId: authPassport.user.id
        });
        return work_position_mapper_1.WorkPositionMapper.mapWorkPositionListItem(workPositionEntity);
    }
    async deleteWorkspaceWorkPosition(authPassport, workPositionId) {
        await this.workPositionService.deleteWorkPosition({
            id: workPositionId,
            userId: authPassport.user.id
        });
    }
};
exports.WorkPositionAdminHubController = WorkPositionAdminHubController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Returns list of work positions", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Work positions", type: work_position_pagination_list_response_1.WorkPositionPaginationListResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, work_position_pagination_filter_request_1.WorkPositionPaginationFilterRequest]),
    __metadata("design:returntype", Promise)
], WorkPositionAdminHubController.prototype, "getWorkPositions", null);
__decorate([
    (0, common_1.Get)("/:workPositionId"),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)()),
    (0, swagger_1.ApiOperation)({ summary: "Returns work position by ID", description: `This endpoint requires correct role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Work position", type: work_position_list_item_response_1.WorkPositionListItemResponse }),
    __param(0, (0, common_1.Param)("workPositionId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkPositionAdminHubController.prototype, "getWorkPosition", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "[Admin] Create work position", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Created work position", type: work_position_list_item_response_1.WorkPositionListItemResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, work_position_create_request_1.WorkPositionCreateRequest]),
    __metadata("design:returntype", Promise)
], WorkPositionAdminHubController.prototype, "createWorkPosition", null);
__decorate([
    (0, common_1.Patch)("/:workPositionId"),
    (0, swagger_1.ApiOperation)({ summary: "[Admin] Update work position", description: `This endpoint requires the "Admin" or "SuperAdmin" role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Updated work position", type: work_position_list_item_response_1.WorkPositionListItemResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("workPositionId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, work_position_patch_request_1.WorkPositionPatchRequest]),
    __metadata("design:returntype", Promise)
], WorkPositionAdminHubController.prototype, "patchWorkPosition", null);
__decorate([
    (0, common_1.Delete)("/:workPositionId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Delete work position" }),
    (0, swagger_1.ApiOkResponse)({ description: "Deleted work position" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Work position not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("workPositionId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], WorkPositionAdminHubController.prototype, "deleteWorkspaceWorkPosition", null);
exports.WorkPositionAdminHubController = WorkPositionAdminHubController = __decorate([
    (0, common_1.Controller)(`/${constants_1.ROUTE_ADMIN_HUB}/${constants_1.ROUTE_WORK_POSITION}`),
    (0, swagger_1.ApiTags)(constants_1.API_TAG_WORK_POSITION),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner)),
    __metadata("design:paramtypes", [work_position_service_1.WorkPositionService])
], WorkPositionAdminHubController);
//# sourceMappingURL=work-position.controller.js.map