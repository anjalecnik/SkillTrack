"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayEntity = void 0;
const constants_1 = require("../../../utils/constants");
const typeorm_1 = require("typeorm");
const date_transformer_helper_1 = require("../helpers/date-transformer.helper");
let HolidayEntity = class HolidayEntity {
    id;
    name;
    date;
    countryCode;
    state;
    region;
    createdAt;
    updatedAt;
};
exports.HolidayEntity = HolidayEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HolidayEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_128
    }),
    __metadata("design:type", String)
], HolidayEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "date",
        transformer: date_transformer_helper_1.DateTransformerHelper
    }),
    __metadata("design:type", Date)
], HolidayEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_2
    }),
    __metadata("design:type", String)
], HolidayEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16,
        nullable: true
    }),
    __metadata("design:type", Object)
], HolidayEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16,
        nullable: true
    }),
    __metadata("design:type", Object)
], HolidayEntity.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HolidayEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HolidayEntity.prototype, "updatedAt", void 0);
exports.HolidayEntity = HolidayEntity = __decorate([
    (0, typeorm_1.Entity)("holiday"),
    (0, typeorm_1.Unique)(["name", "date", "countryCode", "state", "region"])
], HolidayEntity);
//# sourceMappingURL=holiday.entity.js.map