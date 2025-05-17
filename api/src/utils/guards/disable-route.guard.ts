import { CanActivate, Injectable, UseGuards } from "@nestjs/common"

export const DisableRoute = () => UseGuards(DisableRouteGuard)

@Injectable()
export class DisableRouteGuard implements CanActivate {
	canActivate() {
		return false
	}
}
