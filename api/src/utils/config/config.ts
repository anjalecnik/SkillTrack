import { InternalServerErrorException, Logger } from "@nestjs/common"
import * as dotenv from "dotenv"
import * as path from "path"
import { DefaultValues } from "./classes/config.default-values.class"
import { EnvironmentVariables } from "./classes/config.environment-variables.class"
import { isBooleanString } from "class-validator"
import { booleanMapper } from "../class-validator/IsBooleanString"

class ConfigClass {
	private defaultValues: DefaultValues = new DefaultValues()

	constructor() {
		dotenv.config({ path: path.resolve(process.cwd(), ".env") })
	}

	/**
	 * Get value (either default or environment variable).
	 * It returns a default if environment variable not defined.
	 * @param configName Name of configuration variable
	 */
	get<T extends string | number | boolean | string[]>(configName: keyof EnvironmentVariables | keyof DefaultValues): T {
		const env = process.env[configName.toString()]
		const defaultValue = this.defaultValues[configName as keyof DefaultValues]

		// Empty string is valid value, but !env returns true when env = ""
		if (env === undefined && defaultValue === undefined) {
			Logger.error(this.getErrorMessage(configName.toString()))
			throw new InternalServerErrorException("Invalid enviroment", this.getErrorMessage(configName.toString()))
		}

		// Env has priority so check and return env first
		if (env !== undefined) {
			return this.parseType(env)
		}

		return this.parseType(defaultValue)
	}

	private getErrorMessage(configName: string): string {
		return `${configName} not defined in .env nor in ${DefaultValues.name}`
	}

	private parseType<T extends string | number | boolean | string[]>(env: string): T {
		if (isBooleanString(env)) {
			return booleanMapper.get(env.toLowerCase()) as T
		}
		if (this.isNumeric(env)) {
			return parseFloat(env) as T
		}
		if (this.isStringArray(env)) {
			return env.split(", ") as T
		}

		return env as T
	}

	// Resource: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number#:~:text=isNaN(num)%3B-,Typescript,-const%20isNumeric%20%3D%20(
	private isNumeric(num: unknown): boolean {
		return (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) && !isNaN(num as number)
	}

	private isStringArray(env: string): boolean {
		return env.split(", ").length > 1
	}
}

export const Config: ConfigClass = new ConfigClass()
