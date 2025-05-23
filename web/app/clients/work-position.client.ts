import { ClientLoaderFunctionArgs } from "@remix-run/react";
import {
  PaginatedResponse,
  IPositionResponse,
  IPositionRequest,
} from "~/types";
import { privateClient } from "~/util/api";

export class WorkPositionClient {
  static async getWorkPositions(
    loaderArgs: ClientLoaderFunctionArgs,
    limit: number = 0
  ): Promise<PaginatedResponse<IPositionResponse>> {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);

    const query = params.get("sort");

    const [field, direction] = query?.split(":") ?? [];

    const search = params.get("search");
    const levels = params.get("levels")?.split(",");
    const page = params.get("page");

    const { data } = await privateClient.get<
      PaginatedResponse<IPositionResponse>
    >(`/work-positions`, {
      params: {
        sortingDir: direction,
        sort: field,
        levels,
        name: search,
        page: page ? parseInt(page) : undefined,
        limit,
      },
    });

    return data;
  }

  static async createWorkPosition(request: IPositionRequest) {
    const { data } = await privateClient.post<IPositionResponse>(
      `/work-positions`,
      request
    );

    return data;
  }

  static async updateWorkPosition(id: number, request: IPositionRequest) {
    const { data } = await privateClient.patch<IPositionResponse>(
      `/work-positions/${id}`,
      request
    );

    return data;
  }

  static async deleteWorkPosition(id: number) {
    const { data } = await privateClient.delete(`/work-positions/${id}`);
    return data;
  }
}
