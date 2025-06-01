import { UserAssignedVacationPatchRequest } from "../dtos/request/user-assigned-vacation-patch.request";
import { UserAssignedVacationRepository } from "../repository/user-assigned-vacation.repository";
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity";
export declare class UserAssignedVacationService {
    private readonly userAssignedVacationRepository;
    constructor(userAssignedVacationRepository: UserAssignedVacationRepository);
    validateAssignedVacationRequest(userId: number, assignedVacations: UserAssignedVacationPatchRequest[]): Promise<void>;
    createAssignedVacationForYear(workspaceUserId: number, year: number): Promise<UserVacationAssignedEntity>;
    private validateExistingAssignedVacations;
    private validateNoAssignedVacationDeletion;
    private validateInitialAssignedVacation;
    private validateAndReturnOnlyOneInitialAssignedVacation;
    private validateBothInitialPropertiesDefined;
    private validateInitialAssignedVacationPrecedesAll;
}
