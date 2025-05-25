import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { ActivityPerformanceReviewResponse } from "../dtos/response/activity-performance-review.response"
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"
import { UserPerformanceReviewQuartal } from "src/utils/types/enums/user-performance-review-quartal.enum"

export class ActivityPerformanceReviewMapper {
	static mapPerformanceReviews(performanceReviews: UserPerformanceReviewEntity[], userId: number, activities: UserActivityEntity[]): ActivityPerformanceReviewResponse[] {
		const allQuartals: UserPerformanceReviewQuartal[] = [
			UserPerformanceReviewQuartal.Q1,
			UserPerformanceReviewQuartal.Q2,
			UserPerformanceReviewQuartal.Q3,
			UserPerformanceReviewQuartal.Q4
		]

		const yearsWithReviews = new Set(performanceReviews.map(r => r.year))
		let completeReviews: UserPerformanceReviewEntity[] = []

		yearsWithReviews.forEach(year => {
			const existingQuartals = new Set(performanceReviews.filter(r => r.year === year).map(r => r.quartal))
			const isMappingLastYear = Array.from(yearsWithReviews).pop() === year

			allQuartals.forEach(quartal => {
				const hasSoonerQuartal = Array.from(existingQuartals).some(q => q < quartal)
				const hasLaterQuartal = Array.from(existingQuartals).some(q => q > quartal)

				if (!existingQuartals.has(quartal) && ((!isMappingLastYear && hasLaterQuartal) || (isMappingLastYear && hasSoonerQuartal))) {
					completeReviews.push({
						quartal,
						year,
						userId
					} as UserPerformanceReviewEntity)
				}
			})
		})

		performanceReviews = [...performanceReviews, ...completeReviews].sort((a, b) => {
			if (b.year !== a.year) return b.year - a.year
			return allQuartals.indexOf(b.quartal) - allQuartals.indexOf(a.quartal)
		})

		return performanceReviews.map(review => {
			const relatedActivity = activities.find(activity => activity.performanceReviewId === review.id)

			return {
				quartal: review.quartal,
				year: review.year,
				userId: review.userId,
				id: relatedActivity?.activityRequestId ?? null,
				answer1: review.answer1 ?? null,
				answer2: review.answer2 ?? null,
				answer3: review.answer3 ?? null,
				answer4: review.answer4 ?? null,
				createdAt: review.createdAt ?? null,
				reportedBy: relatedActivity?.reportedByUser
					? {
							name: relatedActivity.reportedByUser.name ?? "",
							surname: relatedActivity.reportedByUser.surname ?? ""
					  }
					: null
			} as ActivityPerformanceReviewResponse
		})
	}
}
