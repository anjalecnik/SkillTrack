import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { t } from "i18next";
import { AppHeaderBreadcrumbs, AppLayout } from "~/components/layout";
import { handleAxiosError, requireAdminRoleOrHigher } from "~/util";

import { parseWithZod } from "@conform-to/zod";
import {
  BreadcrumbVariant,
  IProject,
  IUserResponse,
  UserStatusWithoutInvited,
} from "~/types";
import { reportFormSchema } from "~/schemas";
import { ReportsCard } from "~/components/features";
import { ProjectClient, UserClient } from "~/clients";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const submission = parseWithZod(formData, {
    schema: reportFormSchema,
  });

  return json(submission.reply());
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  requireAdminRoleOrHigher(loaderArgs);

  const modifiedLoaderArgs = { ...loaderArgs };
  const requestUrl = new URL(modifiedLoaderArgs.request.url);
  const urlSearchParams = new URLSearchParams(requestUrl.search);
  urlSearchParams.set(
    "status",
    Object.values(UserStatusWithoutInvited).join(",")
  );
  requestUrl.search = urlSearchParams.toString();
  modifiedLoaderArgs.request = new Request(requestUrl, loaderArgs.request);

  try {
    const [users, projects] = await Promise.all([
      UserClient.getUsers(modifiedLoaderArgs),
      ProjectClient.getProjects(loaderArgs),
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
