import { BadRequestException } from "@nestjs/common"
import { WithRequired } from "../types/interfaces"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserStatus } from "../types/enums/user-status.enum"
import { TypeHelper } from "./type.helper"

export abstract class UserHelper {
	static getFullUserName(user: Pick<UserEntity, "name" | "surname">): string {
		return user.name + " " + user.surname
	}

	static getFullUserNameUpperCase(user: Pick<UserEntity, "name" | "surname">): string {
		const fullName = this.getFullUserName(user)

		return fullName
			.toLowerCase()
			.split(" ")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	}

	static getNamePropertiesFromFullName(fullName: string): Pick<UserEntity, "name" | "surname"> {
		const nameSplit = fullName.split(" ")
		const name = nameSplit[0]
		const surname = nameSplit.length > 1 ? nameSplit[nameSplit.length - 1] : ""

		return {
			name,
			surname
		}
	}

	static validateActive(user: UserEntity): void {
		if (user.status !== UserStatus.Active) {
			throw new BadRequestException(`User does not have 'Active' status`, `User status is: ${user.status}`)
		}
	}

	static validateActivityRequestsRelation(user: UserEntity): WithRequired<UserEntity, "activityRequests"> {
		return TypeHelper.validateRelation(user, "activityRequests")
	}
}
