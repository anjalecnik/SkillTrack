import { Injectable } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendMail(requestor: string, activityType: UserActivityType, receiverEmail?: string) {
		try {
			await this.mailerService.sendMail({
				to: receiverEmail ?? process.env.MAIL_USER,
				from: '"Activity request" <linux@over.windows>',
				subject: `${activityType} Request`,
				text: `User ${requestor} requested ${activityType}. Please confirm it in the app https://skilltrack-web.vercel.app/`,
				html: `<p>User <strong>${requestor}</strong> requested ${activityType}. Please confirm it in the app <a href="https://skilltrack-web.vercel.app/">https://skilltrack-web.vercel.app/</a></p>`
			})
			return {
				success: true
			}
		} catch (error) {
			return {
				success: false
			}
		}
	}
}
