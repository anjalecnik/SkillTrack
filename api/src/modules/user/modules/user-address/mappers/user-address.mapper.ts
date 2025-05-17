import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { UserAddressDetailsResponse } from "../dtos/response/user-address-details.response"

export abstract class UserAddressMapper {
	static mapUserAddressDetails(address: UserAddressEntity): UserAddressDetailsResponse {
		return {
			id: address.id,
			streetAddress: address.streetAddress,
			city: address.city,
			state: address.state ?? undefined,
			postalCode: address.postalCode ?? undefined,
			countryCode: address.countryCode,
			type: address.type
		}
	}
}
