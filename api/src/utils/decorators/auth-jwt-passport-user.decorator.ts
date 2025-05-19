import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { IAuthJwtPassportUserRequest } from "../../modules/auth/interfaces"

export const AuthJwtPassportUserDetails = createParamDecorator((_data: unknown, context: ExecutionContext): Partial<IAuthJwtPassportUserRequest> => {
	const { user: passport }: { user: IAuthJwtPassportUserRequest } = context.switchToHttp().getRequest()

	if (!passport) {
		throw new UnauthorizedException("No user found")
	}
	return passport
})
