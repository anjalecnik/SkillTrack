"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalHelper = void 0;
const url_helper_1 = require("./url.helper");
class HalHelper {
    static halPaginationLinks(url, filters, pagination) {
        return {
            self: HalHelper.halSelf(url, filters),
            next: HalHelper.halNext(url, filters, pagination),
            previous: HalHelper.halPrevious(url, filters, pagination),
            first: HalHelper.halFirst(url, filters),
            last: HalHelper.halLast(url, filters, pagination)
        };
    }
    static halSelf(baseUrl, filters) {
        const url = url_helper_1.UrlHelper.createUrlParams(baseUrl, filters);
        return { href: url };
    }
    static halNext(baseUrl, filters, pagination) {
        const filterNext = { ...filters, page: filters.page + 1 };
        const url = url_helper_1.UrlHelper.createUrlParams(baseUrl, filterNext);
        return pagination.to >= pagination.total ? undefined : { href: url };
    }
    static halPrevious(baseUrl, filters, pagination) {
        const filterPrevious = { ...filters, page: filters.page - 1 };
        const url = url_helper_1.UrlHelper.createUrlParams(baseUrl, filterPrevious);
        return pagination.page <= 1 ? undefined : { href: url };
    }
    static halFirst(baseUrl, filters) {
        const filterFirst = { ...filters, page: 1 };
        const url = url_helper_1.UrlHelper.createUrlParams(baseUrl, filterFirst);
        return { href: url };
    }
    static halLast(baseUrl, filters, pagination) {
        const limit = filters.limit > 0 ? filters.limit : 1;
        const lastPage = Math.ceil(pagination.total / limit);
        const filterLast = { ...filters, page: lastPage };
        const url = url_helper_1.UrlHelper.createUrlParams(baseUrl, filterLast);
        return { href: url };
    }
}
exports.HalHelper = HalHelper;
//# sourceMappingURL=hal.helper.js.map