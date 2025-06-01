"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseParamArray = void 0;
const class_transformer_1 = require("class-transformer");
const ParseParamArray = () => (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value]));
exports.ParseParamArray = ParseParamArray;
//# sourceMappingURL=parse-param-array.js.map