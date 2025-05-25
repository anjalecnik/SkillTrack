import { BadRequestException, Injectable } from "@nestjs/common"
import { IActivitySharedCollisionRules } from "../interfaces"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"

@Injectable()
export class ActivitySharedValidationCollisionService {
	public validateCollisions(collisionActivities: UserActivityEntity[], collisionRules: IActivitySharedCollisionRules) {
		this.validateCollisionForDay(collisionActivities, collisionRules)
	}

	private validateCollisionForDay(collisionActivities: UserActivityEntity[], collisionRules: IActivitySharedCollisionRules) {
		if (collisionRules.collidingActivityOnDay === undefined) return
		const rules = collisionRules.collidingActivityOnDay
		const collisions = collisionActivities.filter(activity => rules.includes(activity.activityType))
		if (collisions.length <= 0) return

		throw new BadRequestException(
			`You already reported activities on the selected days, cancel them in order to report.`,
			`Activity Already assigned for [${collisions
				.map(activity => {
					return `${activity.activityType}@${activity.date.toDateString()}`
				})
				.toString()
				.replace(",", ", ")}]`
		)
	}
}
