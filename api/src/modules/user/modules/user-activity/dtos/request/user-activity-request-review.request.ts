import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsIn } from "class-validator"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"

export class UserActivityRequestReviewRequest {
	@ApiPropertyOptional({ description: "Activity status", example: UserActivityStatus.Rejected })
	@IsEnum(UserActivityStatus)
	@IsIn([UserActivityStatus.Rejected, UserActivityStatus.Approved])
	status!: UserActivityStatus
}
