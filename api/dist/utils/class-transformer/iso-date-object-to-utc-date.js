"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsoDateObjectToUtcDate = void 0;
exports.validateIsoDate = validateIsoDate;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dayjs_1 = __importDefault(require("dayjs"));
function validateIsoDate(date, key, dateLength) {
    if (!(0, class_validator_1.isISO8601)(date, { strict: true })) {
        throw new common_1.BadRequestException(`${key} must be a valid ISO8601 date`);
    }
    if (!(0, class_validator_1.length)(date, dateLength, dateLength)) {
        throw new common_1.BadRequestException(`${key} length must be equal to 10`);
    }
}
function validateIsoTime(time, key) {
    if (!(0, class_validator_1.isMilitaryTime)(time)) {
        throw new common_1.BadRequestException(`${key} must be a valid Military time MM:HH`);
    }
}
const IsoDateObjectToUtcDate = () => (0, class_transformer_1.Transform)(({ value, key }) => {
    if (value === null) {
        return null;
    }
    if (Object.keys(value).length !== 2) {
        throw new common_1.BadRequestException(`${key} must have 'date' and 'time' properties`);
    }
    if (!value.date) {
        throw new common_1.BadRequestException(`${key} must must have 'date' property`);
    }
    if (!value.time) {
        throw new common_1.BadRequestException(`${key} must must have 'time' property`);
    }
    const dateObject = value;
    validateIsoDate(dateObject.date, key, 10);
    validateIsoTime(dateObject.time, key);
    return (0, dayjs_1.default)(`${dateObject.date}T${dateObject.time}`).toDate();
}, {});
exports.IsoDateObjectToUtcDate = IsoDateObjectToUtcDate;
//# sourceMappingURL=iso-date-object-to-utc-date.js.map