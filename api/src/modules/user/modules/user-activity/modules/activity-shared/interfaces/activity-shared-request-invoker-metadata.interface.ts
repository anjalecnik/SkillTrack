import { IAuthJwtPassportUserDataRequest } from "src/modules/auth/interfaces"
import { originHub } from "src/utils/types/enums/origin-hub.enum"

export interface IInvokerMetadata {
	user: IAuthJwtPassportUserDataRequest
	requestOriginHub: originHub
}
