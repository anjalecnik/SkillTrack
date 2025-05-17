import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import _ from "lodash"
import { UserAssignedVacationPatchRequest } from "../dtos/request/user-assigned-vacation-patch.request"
import { UserAssignedVacationRepository } from "../repository/user-assigned-vacation.repository"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"

@Injectable()
export class UserAssignedVacationService {
	constructor(private readonly userAssignedVacationRepository: UserAssignedVacationRepository) {}

	async validateAssignedVacationRequest(userId: number, assignedVacations: UserAssignedVacationPatchRequest[]): Promise<void> {
		const existingAssignedVacations = await this.userAssignedVacationRepository.getUserAssignedVacationAll(userId)

		this.validateExistingAssignedVacations(existingAssignedVacations, assignedVacations)
		this.validateNoAssignedVacationDeletion(existingAssignedVacations, assignedVacations)
		this.validateInitialAssignedVacation(assignedVacations)
	}

	async createAssignedVacationForYear(workspaceUserId: number, year: number): Promise<UserVacationAssignedEntity> {
		return this.userAssignedVacationRepository.createAssignedVacationForYear(workspaceUserId, year)
	}

	private validateExistingAssignedVacations(existingAssignedVacations: UserVacationAssignedEntity[], requestedAssignedVacations: UserAssignedVacationPatchRequest[]): void {
		const existingAssignedVacationIds = existingAssignedVacations.map(existingAssignedVacation => existingAssignedVacation.id)

		requestedAssignedVacations.forEach(requestedAssignedVacation => {
			if (requestedAssignedVacation.id && !existingAssignedVacationIds.includes(requestedAssignedVacation.id)) {
				throw new NotFoundException(`Assigned vacation not found.`, `Assigned vacation with ID ${requestedAssignedVacation.id} not found.`)
			}
		})
	}

	private validateNoAssignedVacationDeletion(existingAssignedVacations: UserVacationAssignedEntity[], requestedAssignedVacations: UserAssignedVacationPatchRequest[]): void {
		const existingAssignedVacationYears = existingAssignedVacations.map(existingAssignedVacation => existingAssignedVacation.year)
		const requestedAssignedVacationYears = requestedAssignedVacations.map(requestedAssignedVacation => requestedAssignedVacation.year)

		if (!existingAssignedVacationYears.every(existingAssignedVacationYear => requestedAssignedVacationYears.includes(existingAssignedVacationYear))) {
			throw new BadRequestException("Cannot delete assigned vacation.")
		}
	}

	private validateInitialAssignedVacation(requestedAssignedVacations: UserAssignedVacationPatchRequest[]): void {
		const initialAssignedVacation = this.validateAndReturnOnlyOneInitialAssignedVacation(requestedAssignedVacations)
		if (!initialAssignedVacation) {
			return
		}

		this.validateBothInitialPropertiesDefined(initialAssignedVacation)
		this.validateInitialAssignedVacationPrecedesAll(initialAssignedVacation, requestedAssignedVacations)
	}

	private validateAndReturnOnlyOneInitialAssignedVacation(requestedAssignedVacations: UserAssignedVacationPatchRequest[]): UserAssignedVacationPatchRequest | undefined {
		const initialAssignedVacations = requestedAssignedVacations.filter(
			requestedAssignedVacation => requestedAssignedVacation.initialUsedDays || requestedAssignedVacation.initialDate
		)

		if (initialAssignedVacations.length > 1) {
			throw new BadRequestException("User already has set initial vacation status")
		}
		if (initialAssignedVacations.length === 0) {
			return undefined
		}

		return initialAssignedVacations.at(0)
	}

	private validateBothInitialPropertiesDefined({ initialUsedDays, initialDate }: UserAssignedVacationPatchRequest): void {
		const bothDefined = initialUsedDays !== undefined && initialDate !== undefined
		if (!bothDefined) {
			throw new BadRequestException("Initial vacation setup is not complete")
		}
	}

	private validateInitialAssignedVacationPrecedesAll(
		initialAssignedVacation: UserAssignedVacationPatchRequest,
		requestedAssignedVacations: UserAssignedVacationPatchRequest[]
	): void {
		const assignedVacationSorted = requestedAssignedVacations.sort((a, b) => a.year - b.year)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		if (!_.isEqual(assignedVacationSorted.at(0), initialAssignedVacation)) {
			throw new BadRequestException("Initial assigned vacation must precede all other assigned vacations.")
		}
	}
}
