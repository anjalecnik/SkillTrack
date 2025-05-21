import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { IAuthUserLocalSignupDbRequest } from "../interfaces/db/auth-user-local-create-db.interface"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserStatus } from "src/utils/types/enums/user-status.enum"

@Injectable()
export class AuthRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	//#region User
	async getUserByEmail(email: string): Promise<UserEntity | undefined> {
		const user = await this.userRepository.findOne({ where: { email } })
		return user ?? undefined
	}

	async getUserById(userId: number): Promise<UserEntity | undefined> {
		const user = await this.userRepository.findOne({ where: { id: userId } })
		return user ?? undefined
	}

	async getOrCreateUserByEmail(email: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ where: { email } })
		if (user) return user
		return this.userRepository.save({ email, status: UserStatus.Active })
	}

	async createUser(localSignup: IAuthUserLocalSignupDbRequest): Promise<UserEntity> {
		return this.userRepository.save(localSignup)
	}
	//#endregion User
}
