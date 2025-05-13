import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MasterDataSource } from "./master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([])],
	providers: [MasterDataSource],
	exports: [MasterDataSource, TypeOrmModule]
})
export class DbModule {}
