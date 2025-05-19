export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export async function makeApiRequest(
  page: any,
  endpointUrl: string,
  accessToken: string,
  method: HttpMethod,
  body?: any
): Promise<{ body: any; status: number }> {
  const options: any = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.data = body;
  }

  const response = await page.request[method.toLowerCase()](
    endpointUrl,
    options
  );

  return {
    body: response.status() === 204 ? null : await response.json(),
    status: response.status(),
  };
}
