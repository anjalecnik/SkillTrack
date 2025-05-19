import { BadRequestException, NotFoundException } from "@nestjs/common"
import _ from "lodash"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { UserAddressPatchRequest } from "src/modules/user/modules/user-address/dtos/request/user-address-patch.request"
import { UserAddressType } from "../types/enums/user-address.enum"
import { AddressDataDto } from "../types/dtos"

export class AddressHelper {
	static validateAddressRequest<T extends UserAddressEntity, U extends UserAddressPatchRequest>(existingAddresses: T[], requestedAddresses: U[]): void {
		this.validateRequestedAddresses(existingAddresses, requestedAddresses)
		this.validateMainAddress(requestedAddresses)
		this.validateNoDuplicateAddresses(requestedAddresses)
	}

	private static validateRequestedAddresses<T extends UserAddressEntity, U extends UserAddressPatchRequest>(existingAddresses: T[], requestedAddresses: U[]): void {
		const existingAddressIds = existingAddresses.map(existingAddress => existingAddress.id)
		const requestedAddressIds = requestedAddresses.filter(requestedAddress => requestedAddress.id).map(requestedAddress => requestedAddress.id!)
		const duplicates = requestedAddressIds.filter((id, index) => requestedAddressIds.indexOf(id) !== index)

		if (duplicates.length !== 0) throw new BadRequestException("Address duplication", `Address '${duplicates[0]}' specified multiple times`)

		requestedAddressIds.forEach(requestedAddressId => {
			if (!existingAddressIds.includes(requestedAddressId)) throw new NotFoundException("Address not found", `Address '${requestedAddressId}' does not exists`)
		})
	}

	private static validateMainAddress<T extends UserAddressPatchRequest>(requestedAddresses: T[]): void {
		const mainAddresses = requestedAddresses.filter(requestedAddress => Object.values<string>(UserAddressType).includes(requestedAddress.type))
		if (mainAddresses.length !== 1) {
			throw new BadRequestException("One Main address must be specified")
		}
	}

	private static validateNoDuplicateAddresses<T extends UserAddressPatchRequest>(requestedAddresses: T[]): void {
		for (let i: number = 0; i < requestedAddresses.length; i++) {
			const iAddress = this.getAddressData(requestedAddresses[i])

			for (let j: number = 0; j < requestedAddresses.length; j++) {
				if (i === j) continue // Exclude self check

				const jAddress = this.getAddressData(requestedAddresses[j])

				// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
				if (_.isEqual(iAddress, jAddress)) throw new BadRequestException(`You already have address with the same information. Duplicated addresses not allowed.`)
			}
		}
	}

	private static getAddressData<T extends UserAddressPatchRequest>(address: T): AddressDataDto {
		return {
			streetAddress: address.streetAddress,
			city: address.city,
			state: address.state ?? null,
			postalCode: address.postalCode ?? null,
			countryCode: address.countryCode
		}
	}
}
