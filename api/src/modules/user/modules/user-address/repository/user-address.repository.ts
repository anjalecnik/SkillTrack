import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { Repository } from "typeorm"

@Injectable()
export class UserAddressRepository {
	constructor(
		@InjectRepository(UserAddressEntity)
		private readonly userAddressRepository: Repository<UserAddressEntity>
	) {}

	async getUserAddressAll(userId: number): Promise<UserAddressEntity[]> {
		return this.userAddressRepository.find({ where: { userId } })
	}

	async checkIfUserAddressExistOrThrow(userId: number, addressId: number): Promise<void> {
		await this.userAddressRepository.findOneOrFail({ where: { id: addressId, userId } })
	}
}
