import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { WorkPositionRepository } from "../repository/work-position.repository"
import { IWorkPositionCreateRequest, IWorkPositionDeleteRequest, IWorkPositionPaginationFilterRequest, IWorkPositionPatchRequest } from "../interfaces"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity"

@Injectable()
export class WorkPositionService {
	constructor(private readonly workPositionRepository: WorkPositionRepository) {}

	async getWorkPositions(filters: IWorkPositionPaginationFilterRequest): Promise<IPaginatedResponse<WorkPositionEntity>> {
		return this.workPositionRepository.getWorkPositions(filters)
	}

	async getWorkPosition(workPositionId: number): Promise<WorkPositionEntity> {
		return this.validateWorkPositionExistOrThrow(workPositionId)
	}

	async createWorkPosition(workPositionCreateRequest: IWorkPositionCreateRequest): Promise<WorkPositionEntity> {
		return this.workPositionRepository.createWorkPosition(workPositionCreateRequest)
	}

	async patchWorkPosition(workPositionPatchRequest: IWorkPositionPatchRequest): Promise<WorkPositionEntity> {
		await this.validateWorkPositionExistOrThrow(workPositionPatchRequest.id)
		return this.workPositionRepository.patchWorkPosition(workPositionPatchRequest)
	}

	async deleteWorkPosition(workPositionDeleteRequest: IWorkPositionDeleteRequest): Promise<void> {
		await this.validateWorkPositionExistOrThrow(workPositionDeleteRequest.id)
		await this.validateWorkPositionNotAssignedOrThrow(workPositionDeleteRequest.id)
		await this.validateWorkPositionNotPromotionOrThrow(workPositionDeleteRequest.id)

		return this.workPositionRepository.deleteWorkPosition(workPositionDeleteRequest.id)
	}

	private async validateWorkPositionExistOrThrow(id: number): Promise<WorkPositionEntity> {
		const workPositionEntity = await this.workPositionRepository.getWorkPosition(id)

		if (!workPositionEntity) {
			throw new NotFoundException("Work position not found", `Work position '${id}' does not exists`)
		}

		return workPositionEntity
	}

	private async validateWorkPositionNotAssignedOrThrow(id: number): Promise<void> {
		const isAssigned = await this.workPositionRepository.isWorkPositionAssignedToUser(id)

		if (isAssigned)
			throw new BadRequestException(
				"Work position is assign to users. Please unassign work position from users before deleting it",
				`Cannot delete work position ID: ${id} because its still assigned to users.`
			)
	}

	private async validateWorkPositionNotPromotionOrThrow(workPositionId: number): Promise<void> {
		const workPromotions = await this.workPositionRepository.getWorkPositionPromotions(workPositionId)

		if (workPromotions.length !== 0)
			throw new BadRequestException(
				"You cannot remove this work position, since is still related to another position. Remove relation before deleting it.",
				`Cannot delete work position ID: ${workPositionId} because its associated with active promotions.`
			)
	}
}
