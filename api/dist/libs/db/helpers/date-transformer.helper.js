"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTransformerHelper = void 0;
exports.DateTransformerHelper = {
    to(value) {
        return value ? value : null;
    },
    from(value) {
        return value ? new Date(value.slice(0, 10)) : null;
    }
};
//# sourceMappingURL=date-transformer.helper.js.map