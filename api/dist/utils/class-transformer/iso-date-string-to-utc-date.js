"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsoDateStringToUtcDate = void 0;
const class_transformer_1 = require("class-transformer");
const dayjs_1 = __importDefault(require("dayjs"));
const iso_date_object_to_utc_date_1 = require("./iso-date-object-to-utc-date");
const IsoDateStringToUtcDate = (dateLength) => (0, class_transformer_1.Transform)(({ value, key }) => {
    if (value === null) {
        return null;
    }
    if (Array.isArray(value)) {
        return value.map(dateStr => {
            (0, iso_date_object_to_utc_date_1.validateIsoDate)(dateStr, key, dateLength);
            return (0, dayjs_1.default)(dateStr).toDate();
        });
    }
    (0, iso_date_object_to_utc_date_1.validateIsoDate)(value, key, dateLength);
    return (0, dayjs_1.default)(value).toDate();
}, {});
exports.IsoDateStringToUtcDate = IsoDateStringToUtcDate;
//# sourceMappingURL=iso-date-string-to-utc-date.js.map