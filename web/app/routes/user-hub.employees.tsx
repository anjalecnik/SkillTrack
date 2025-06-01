import { parseWithZod } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { t } from "i18next";
import { useEffect } from "react";
import { UserClient } from "~/clients";
import { EmployeesCard } from "~/components/features";
import { AppHeaderBreadcrumbs, AppLayout } from "~/components/layout";
import { DEFAULT_PAGINATION_LIMIT } from "~/constants";
import { useGoBackToPage } from "~/hooks";
import { addEmployeeFormSchema as schema } from "~/schemas";
import {
  BreadcrumbVariant,
  IWorkspaceUserInviteReq,
  Status,
  UserStatus,
} from "~/types";
import { handleAxiosError } from "~/util";
import { displaySuccess } from "~/util/snackbar-success";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  try {
    const inviteUserReq: IWorkspaceUserInviteReq = {
      invitations: [
        {
          email: submission.value.email,
          name: submission.value.name,
          surname: submission.value.surname,
        },
      ],
    };

    const users = await UserClient.inviteUser(inviteUserReq);

    displaySuccess(t("workspaceEmployees.invitationSentMessage")!);

    if (submission.value.intent === "create") {
      return json(submission.reply());
    }

    return redirect(`${users.invitations[0].workspaceUserId}`);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  const modifiedLoaderArgs = { ...loaderArgs };
  const requestUrl = new URL(modifiedLoaderArgs.request.url);
  const urlSearchParams = new URLSearchParams(requestUrl.search);
  if (!urlSearchParams.get("status")) {
    urlSearchParams.set("status", Object.values(UserStatus).join(","));
    requestUrl.search = urlSearchParams.toString();
    modifiedLoaderArgs.request = new Request(requestUrl, loaderArgs.request);

    return redirect(modifiedLoaderArgs.request.url);
  }

  try {
    const users = await UserClient.getUsers(
      modifiedLoaderArgs,
      DEFAULT_PAGINATION_LIMIT
    );

    return json(users);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export default function UserHubEmployees() {
  const users = useLoaderData<typeof clientLoader>();
  const goBackToPage = useGoBackToPage();

  useEffect(() => {
    goBackToPage(users);
  }, [users]);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("menu.teamMembers"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <EmployeesCard users={users} />
    </AppLayout>
  );
}
