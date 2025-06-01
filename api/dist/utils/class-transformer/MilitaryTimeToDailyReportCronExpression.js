"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilitaryTimeToDailyReportCronExpression = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const MilitaryTimeToDailyReportCronExpression = () => (0, class_transformer_1.Transform)(({ value, key }) => {
    if (!(0, class_validator_1.isMilitaryTime)(value)) {
        throw new common_1.BadRequestException(`${key} must be a valid representation of military time in the format HH:MM`);
    }
    const minute = value.split(":")[1];
    const hour = value.split(":")[0];
    return `0 ${minute} ${hour} * * 1-5`;
}, {});
exports.MilitaryTimeToDailyReportCronExpression = MilitaryTimeToDailyReportCronExpression;
//# sourceMappingURL=MilitaryTimeToDailyReportCronExpression.js.map