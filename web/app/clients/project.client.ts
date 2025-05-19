import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import {
  PaginatedResponse,
  IProject,
  IProjectCreateRequest,
  IProjectUpdateRequest,
  SortBy,
  SortDirection,
  SearchParam,
} from "~/types";
import { privateClient } from "~/util/api";

export class ProjectClient {
  static async getProjects(
    loaderArgs: ClientLoaderFunctionArgs,
    options: {
      limit?: number;
      metadata?: boolean;
    } = {},
    workspaceUserIds?: number[]
  ): Promise<PaginatedResponse<IProject>> {
    const { limit = 0, metadata = false } = options;

    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);

    const query = params.get("sort");

    let [field, direction] = query?.split(":") ?? [];

    if (!field && !direction) {
      field = SortBy.name;
      direction = SortDirection.Asc;
    }

    const statuses = params.get(SearchParam.Statuses)?.split(",");

    const search = params.get("search");
    const page = params.get("page");

    const { data } = await privateClient.get<PaginatedResponse<IProject>>(
      `/projects`,
      {
        params: {
          sortingDir: direction,
          sort: field,
          statuses,
          name: search,
          page: page ? parseInt(page) : undefined,
          limit,
          metadata,
          workspaceUserIds,
        },
      }
    );

    return data;
  }

  static async getProjectById(
    loaderArgs: ClientLoaderFunctionArgs
  ): Promise<IProject> {
    const { data } = await privateClient.get<IProject>(
      `/projects/${loaderArgs.params.projectId}`
    );
    return data;
  }
  static async addProject(project: IProjectCreateRequest) {
    const { data } = await privateClient.post<IProject>(`/projects`, project);

    return data;
  }

  static async updateProject(
    actionArgs: ClientActionFunctionArgs,
    project: IProjectUpdateRequest
  ) {
    const { data } = await privateClient.patch<IProject>(
      `/projects/${actionArgs.params.projectId}`,
      project
    );

    return data;
  }

  static async deleteProjects(ids: number[]) {
    const { data } = await privateClient.delete<IProject>(`/projects`, {
      params: { ids },
    });

    return data;
  }
}
