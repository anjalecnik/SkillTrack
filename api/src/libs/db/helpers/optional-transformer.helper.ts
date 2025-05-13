import { ValueTransformer } from "typeorm"

export const optionalTransformerHelper: ValueTransformer = {
	to<T>(value: T | undefined): T | null {
		return value !== undefined ? value : null
	},

	from<T>(value: T | null): T | undefined {
		return value !== null ? value : undefined
	}
}
