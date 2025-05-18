export function buildUrlWithParams(baseUrl: string, params: object): string {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return `${baseUrl}?${queryParams}`;
}
