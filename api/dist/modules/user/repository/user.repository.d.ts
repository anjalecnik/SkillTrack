import { UserEntity } from "src/libs/db/entities/user.entity";
import { Repository } from "typeorm";
import { MasterDataSource } from "../../../libs/db/master-data-source.service";
import { IUserInvitationDBRequest, IUserPaginationFilterDBRequest, IUserPatchDBRequest } from "../interfaces";
import { IPaginatedResponse } from "src/utils/types/interfaces";
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity";
export declare class UserRepository {
    private userRepository;
    private projectUserRepository;
    private readonly masterDataSource;
    constructor(userRepository: Repository<UserEntity>, projectUserRepository: Repository<ProjectUserEntity>, masterDataSource: MasterDataSource);
    getAllWorkspaceUsers(): Promise<UserEntity[]>;
    getUserList(filters: IUserPaginationFilterDBRequest): Promise<IPaginatedResponse<UserEntity>>;
    invite(userInvitationRequest: IUserInvitationDBRequest): Promise<UserEntity[]>;
    joinByInvitation(userId: number): Promise<UserEntity>;
    getUserByUserId(userId: number): Promise<UserEntity | null>;
    updateUser(userPatchRequest: IUserPatchDBRequest): Promise<UserEntity>;
    setUserActive(userId: number): Promise<UserEntity>;
    private setUserAddresses;
    private setUserAssignedVacations;
    private setUserProjects;
    private setOrder;
    private setUserProjectsToUpdate;
    private setUserProjectsToAdd;
    private setUserProjectsToStay;
}
