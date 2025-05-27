import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity";
import { RequiredNotNull } from "src/utils/types/interfaces";
export type IUserAssignedProject = RequiredNotNull<Pick<ProjectUserEntity, "projectId" | "userId" | "role" | "assignedPercentage">>;
