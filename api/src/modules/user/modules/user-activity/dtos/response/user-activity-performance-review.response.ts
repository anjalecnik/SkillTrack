export interface UserActivityPerformanceReviewResponse {
	id: number
	user: {
		id: number
		name: string
		surname: string
		email: string
	}
	scores: IPerformanceReview[]
}

export interface IPerformanceReview {
	id: number
	answer1: number
	answer2: number
	answer3: boolean
	answer4: boolean
	score: number
	quartal: string
	year: string
}
