import { CanActivate } from "@nestjs/common";
export declare const DisableRoute: () => MethodDecorator & ClassDecorator;
export declare class DisableRouteGuard implements CanActivate {
    canActivate(): boolean;
}
