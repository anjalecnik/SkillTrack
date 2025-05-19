import { Module } from "@nestjs/common"
import { UserAddressRepository } from "./repository/user-address.repository"
import { UserAddressService } from "./services/user-address.service"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [TypeOrmModule.forFeature([UserAddressEntity])],
	providers: [UserAddressRepository, UserAddressService, UserAddressRepository],
	exports: [UserAddressService, UserAddressRepository]
})
export class UserAddressModule {}
