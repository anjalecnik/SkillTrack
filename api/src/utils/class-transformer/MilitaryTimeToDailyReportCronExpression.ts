import { BadRequestException } from "@nestjs/common"
import { Transform } from "class-transformer"
import { isMilitaryTime } from "class-validator"

export const MilitaryTimeToDailyReportCronExpression = () =>
	Transform(({ value, key }) => {
		if (!isMilitaryTime(value)) {
			throw new BadRequestException(`${key} must be a valid representation of military time in the format HH:MM`)
		}

		const minute = (value as string).split(":")[1]
		const hour = (value as string).split(":")[0]

		return `0 ${minute} ${hour} * * 1-5` // Cron expression for daily job from MON-FRI at specified minute and hour
	}, {})
