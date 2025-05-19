import { Transform } from "class-transformer"

const optionalBooleanMapper = new Map([
	["undefined", undefined],
	["true", true],
	["True", true],
	["TRUE", true],
	["1", true],
	["false", Boolean(false)],
	["False", false],
	["FALSE", false],
	["0", false]
])

// mostly used for query parameters
export const ParseOptionalBoolean = () => Transform(({ value }) => optionalBooleanMapper.get(value as string))
