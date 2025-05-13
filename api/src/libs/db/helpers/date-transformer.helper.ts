import { ValueTransformer } from "typeorm"

export const DateTransformerHelper: ValueTransformer = {
	to(value: Date | null): Date | null {
		return value ? value : null
	},

	from(value: string | null): Date | null {
		return value ? new Date(value.slice(0, 10)) : null
	}
}
