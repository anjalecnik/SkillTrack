import { Module } from "@nestjs/common"
import { MailerModule } from "@nestjs-modules/mailer"
import { MailService } from "./services/mail.service"

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					// For relay SMTP server set the host to smtp-relay.gmail.com
					// and for Gmail STMO server set it to smtp.gmail.com
					host: process.env.MAIL_HOST,
					// For SSL and TLS connection
					secure: true,
					port: 465,
					auth: {
						// Account gmail address
						user: process.env.MAIL_USER,
						pass: process.env.MAIL_PASS
					}
				}
			})
		})
	],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule {}
