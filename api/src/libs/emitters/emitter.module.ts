import { Module } from "@nestjs/common"
import { AccessTokenEmitterService } from "./access-token-emitter.service"

@Module({
	providers: [AccessTokenEmitterService],
	exports: [AccessTokenEmitterService]
})
export class EmitterModule {}
