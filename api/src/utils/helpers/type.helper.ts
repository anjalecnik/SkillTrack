import { InternalServerErrorException } from "@nestjs/common"
import { WithRequired } from "../types/interfaces"

export abstract class TypeHelper {
	static validateRelation<T, K extends keyof T>(entity: T, key: K): WithRequired<T, K> {
		const containsRelation = (_entity: T): _entity is WithRequired<T, K> => !!_entity[key]

		if (containsRelation(entity)) {
			return entity
		}

		throw new InternalServerErrorException("Invalid relation", `Entity is missing the required '${String(key)}' relation`)
	}
}
