"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateToMMDDFormat = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const DateToMMDDFormat = () => (0, class_transformer_1.Transform)(({ value, key }) => {
    if (!(0, class_validator_1.isISO8601)(value) || value.length < 10) {
        throw new common_1.BadRequestException(`${key} must be a valid date or timestamp`);
    }
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return month + "-" + day;
}, {});
exports.DateToMMDDFormat = DateToMMDDFormat;
//# sourceMappingURL=DateToMMDDFormat.js.map