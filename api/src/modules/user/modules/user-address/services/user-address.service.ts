import { Injectable } from "@nestjs/common"
import { UserAddressRepository } from "../repository/user-address.repository"
import { UserAddressPatchRequest } from "../dtos/request/user-address-patch.request"
import { AddressHelper } from "src/utils/helpers/address.helper"

@Injectable()
export class UserAddressService {
	constructor(private readonly userAddressRepository: UserAddressRepository) {}

	async validateAddressRequest(userId: number, addresses: UserAddressPatchRequest[]): Promise<void> {
		const existingAddresses = await this.userAddressRepository.getUserAddressAll(userId)

		AddressHelper.validateAddressRequest(existingAddresses, addresses)
	}
}
