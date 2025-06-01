"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeHelper = void 0;
const common_1 = require("@nestjs/common");
class TypeHelper {
    static validateRelation(entity, key) {
        const containsRelation = (_entity) => !!_entity[key];
        if (containsRelation(entity)) {
            return entity;
        }
        throw new common_1.InternalServerErrorException("Invalid relation", `Entity is missing the required '${String(key)}' relation`);
    }
}
exports.TypeHelper = TypeHelper;
//# sourceMappingURL=type.helper.js.map