"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseOptionalBoolean = void 0;
const class_transformer_1 = require("class-transformer");
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
]);
const ParseOptionalBoolean = () => (0, class_transformer_1.Transform)(({ value }) => optionalBooleanMapper.get(value));
exports.ParseOptionalBoolean = ParseOptionalBoolean;
//# sourceMappingURL=parse-optional-boolean.js.map