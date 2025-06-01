"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityOverviewPerformanceReviewMapper = void 0;
const hal_helper_1 = require("../../../utils/helpers/hal.helper");
class ActivityOverviewPerformanceReviewMapper {
    static mapActivityOverview(data, filter) {
        const href = `api/workspace-hub/activities/performanceReview`;
        return {
            _links: { self: hal_helper_1.HalHelper.halSelf(href, filter) },
            data: data.data,
            meta: data.meta
        };
    }
}
exports.ActivityOverviewPerformanceReviewMapper = ActivityOverviewPerformanceReviewMapper;
//# sourceMappingURL=activity-overview-performance-review.mapper.js.map