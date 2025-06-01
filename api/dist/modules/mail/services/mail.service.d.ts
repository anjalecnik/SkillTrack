import { MailerService } from "@nestjs-modules/mailer";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(requestor: string, activityType: UserActivityType, receiverEmail?: string): Promise<{
        success: boolean;
    }>;
}
