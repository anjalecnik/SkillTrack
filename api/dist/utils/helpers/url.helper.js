"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlHelper = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class UrlHelper {
    static createUrlParams(url, obj, dateFormat = "YYYY-MM-DD") {
        if (obj === undefined)
            return url;
        const params = new URLSearchParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (Array.isArray(value)) {
                    value.forEach((element) => {
                        if (typeof element === "string" || typeof element === "number")
                            params.append(key, element.toString());
                    });
                }
                else if (typeof value === "string" || typeof value === "number") {
                    params.append(key, value.toString());
                }
                else if (value instanceof Date) {
                    params.append(key, (0, dayjs_1.default)(value).format(dateFormat));
                }
            }
        }
        const finalParams = params.toString();
        return `${url}${finalParams.length > 0 ? `?${finalParams}` : ""}`;
    }
}
exports.UrlHelper = UrlHelper;
//# sourceMappingURL=url.helper.js.map