// app-config.service.ts
import { Injectable } from "@nestjs/common"
import { Config } from "../utils/config/config" // Adjust path if needed
import { DefaultValues } from "src/utils/config/classes/config.default-values.class"

type ConfigKey = keyof DefaultValues

@Injectable()
export class AppConfigService {
	get<T extends string | number | boolean | string[]>(key: ConfigKey): T {
		return Config.get<T>(key)
	}
}
