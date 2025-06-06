import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { t } from "i18next";
import { AppHeaderBreadcrumbs, AppLayout } from "~/components/layout";
import { handleAxiosError } from "~/util";

import { ProjectClient, UserClient } from "~/clients";
import { parseWithZod } from "@conform-to/zod";
import {
  BreadcrumbVariant,
  IProject,
  IUserResponse,
  SearchParam,
  UserStatusWithoutInvited,
} from "~/types";
import { reportFormSchema } from "~/schemas";
import { ReportsCard } from "~/components/features";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const submission = parseWithZod(formData, {
    schema: reportFormSchema,
  });

  return json(submission.reply());
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  const modifiedLoaderArgs = { ...loaderArgs };
  const requestUrl = new URL(modifiedLoaderArgs.request.url);
  const urlSearchParams = new URLSearchParams(requestUrl.search);
  urlSearchParams.set(
    "status",
    Object.values(UserStatusWithoutInvited).join(",")
  );
  requestUrl.search = urlSearchParams.toString();
  modifiedLoaderArgs.request = new Request(requestUrl, loaderArgs.request);

  // get employee IDs from query params
  let employeeIds = urlSearchParams
    .get(SearchParam.EmployeeIds)
    ?.split(",")
    ?.map((x) => Number(x));
  try {
    const [users] = await Promise.all([
      UserClient.getUsers(modifiedLoaderArgs),
    ]);

    // if no query param is set, fetch all projects of subordinates
    if (!employeeIds) {
      employeeIds = users.data.map((x) => Number(x.id));
    }

    const [projects] = await Promise.all([
      ProjectClient.getProjects(loaderArgs, {}, employeeIds),
    ]);

    return json({
      users: users.data,
      projects: projects.data,
    });
  } catch (error) {
    return handleAxiosError(error);
  }
};

export default function Reports() {
  const lastResult = useActionData<typeof clientAction>();
  const { users, projects } = useLoaderData<typeof clientLoader>() as {
    users: IUserResponse[];
    projects: IProject[];
  };

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("workspaceReports.title"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <ReportsCard lastResult={lastResult} projects={projects} users={users} />
    </AppLayout>
  );
}
