import { PipeTransform } from "@nestjs/common";
import { IUserActivityRequestUpdate } from "src/modules/user/modules/user-activity/interfaces";
import { UserActivityType } from "../types/enums/user-activity.enum";
interface IActivityEssentials {
    activityType: UserActivityType;
}
export declare class UpdateUserActivityValidationPipe implements PipeTransform {
    private readonly validationPipe;
    transform<T extends IActivityEssentials>(object: T): Promise<IUserActivityRequestUpdate>;
    private getActivity;
}
export {};
