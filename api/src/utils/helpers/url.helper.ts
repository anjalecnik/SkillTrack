import dayjs from "dayjs"
export abstract class UrlHelper {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static createUrlParams(url: string, obj?: Record<string, any>, dateFormat = "YYYY-MM-DD"): string {
		if (obj === undefined) return url
		const params = new URLSearchParams()
		for (const key in obj) {
			// eslint-disable-next-line no-prototype-builtins
			if (obj.hasOwnProperty(key)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const value = obj[key]
				if (Array.isArray(value)) {
					value.forEach((element: unknown) => {
						if (typeof element === "string" || typeof element === "number") params.append(key, element.toString())
					})
				} else if (typeof value === "string" || typeof value === "number") {
					params.append(key, value.toString())
				} else if (value instanceof Date) {
					params.append(key, dayjs(value).format(dateFormat))
				}
			}
		}
		const finalParams = params.toString()
		return `${url}${finalParams.length > 0 ? `?${finalParams}` : ""}`
	}
}
