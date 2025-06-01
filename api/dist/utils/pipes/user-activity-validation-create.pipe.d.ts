import { PipeTransform, ValidationPipe } from "@nestjs/common";
import { IUserActivityRequestCreate } from "src/modules/user/modules/user-activity/interfaces";
import { UserActivityType } from "../types/enums/user-activity.enum";
interface IActivityEssentials {
    activityType: UserActivityType;
}
export declare class CreateUserActivityValidationPipe implements PipeTransform {
    private readonly validationPipe;
    constructor(validationPipe: ValidationPipe);
    transform<T extends IActivityEssentials>(object: T): Promise<IUserActivityRequestCreate>;
    private getActivity;
}
export {};
