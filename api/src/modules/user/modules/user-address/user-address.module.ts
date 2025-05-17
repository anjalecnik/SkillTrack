import { Module } from "@nestjs/common"
import { UserAddressRepository } from "./repository/user-address.repository"
import { UserAddressService } from "./services/user-address.service"
import { DbModule } from "src/libs/db/db.module"

@Module({
	imports: [DbModule],
	providers: [UserAddressRepository, UserAddressService],
	exports: [UserAddressService]
})
export class UserAddressModule {}
