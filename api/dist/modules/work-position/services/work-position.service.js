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
exports.WorkPositionService = void 0;
const common_1 = require("@nestjs/common");
const work_position_repository_1 = require("../repository/work-position.repository");
let WorkPositionService = class WorkPositionService {
    workPositionRepository;
    constructor(workPositionRepository) {
        this.workPositionRepository = workPositionRepository;
    }
    async getWorkPositions(filters) {
        return this.workPositionRepository.getWorkPositions(filters);
    }
    async getWorkPosition(workPositionId) {
        return this.validateWorkPositionExistOrThrow(workPositionId);
    }
    async createWorkPosition(workPositionCreateRequest) {
        return this.workPositionRepository.createWorkPosition(workPositionCreateRequest);
    }
    async patchWorkPosition(workPositionPatchRequest) {
        await this.validateWorkPositionExistOrThrow(workPositionPatchRequest.id);
        return this.workPositionRepository.patchWorkPosition(workPositionPatchRequest);
    }
    async deleteWorkPosition(workPositionDeleteRequest) {
        await this.validateWorkPositionExistOrThrow(workPositionDeleteRequest.id);
        await this.validateWorkPositionNotAssignedOrThrow(workPositionDeleteRequest.id);
        await this.validateWorkPositionNotPromotionOrThrow(workPositionDeleteRequest.id);
        return this.workPositionRepository.deleteWorkPosition(workPositionDeleteRequest.id);
    }
    async validateWorkPositionExistOrThrow(id) {
        const workPositionEntity = await this.workPositionRepository.getWorkPosition(id);
        if (!workPositionEntity) {
            throw new common_1.NotFoundException("Work position not found", `Work position '${id}' does not exists`);
        }
        return workPositionEntity;
    }
    async validateWorkPositionNotAssignedOrThrow(id) {
        const isAssigned = await this.workPositionRepository.isWorkPositionAssignedToUser(id);
        if (isAssigned)
            throw new common_1.BadRequestException("Work position is assign to users. Please unassign work position from users before deleting it", `Cannot delete work position ID: ${id} because its still assigned to users.`);
    }
    async validateWorkPositionNotPromotionOrThrow(workPositionId) {
        const workPromotions = await this.workPositionRepository.getWorkPositionPromotions(workPositionId);
        if (workPromotions.length !== 0)
            throw new common_1.BadRequestException("You cannot remove this work position, since is still related to another position. Remove relation before deleting it.", `Cannot delete work position ID: ${workPositionId} because its associated with active promotions.`);
    }
};
exports.WorkPositionService = WorkPositionService;
exports.WorkPositionService = WorkPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [work_position_repository_1.WorkPositionRepository])
], WorkPositionService);
//# sourceMappingURL=work-position.service.js.map