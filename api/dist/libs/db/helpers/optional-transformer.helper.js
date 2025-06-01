"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalTransformerHelper = void 0;
exports.optionalTransformerHelper = {
    to(value) {
        return value !== undefined ? value : null;
    },
    from(value) {
        return value !== null ? value : undefined;
    }
};
//# sourceMappingURL=optional-transformer.helper.js.map