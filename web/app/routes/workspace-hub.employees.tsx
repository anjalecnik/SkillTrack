import { json, redirect } from "@remix-run/node";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  requireAdminRoleOrHigher,
  handleAxiosError,
  displaySuccess,
} from "~/util";
import { useEffect, useState } from "react";
import {
  BreadcrumbVariant,
  IWorkspaceUserInviteReq,
  Status,
  UserStatus,
} from "~/types";
import { AddEmployeeDialogForm, EmployeesCard } from "~/components/features";
import { t } from "i18next";
import { addEmployeeFormSchema as schema } from "~/schemas";
import { DEFAULT_PAGINATION_LIMIT } from "~/constants";
import { UserClient } from "~/clients";
import { parseWithZod } from "@conform-to/zod";
import { useGoBackToPage } from "~/hooks";

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

    const workspaceUsers = await UserClient.inviteUser(inviteUserReq);

    displaySuccess(t("workspaceEmployees.invitationSentMessage")!);

    if (submission.value.intent === "create") {
      return json(submission.reply());
    }

    return redirect(`${workspaceUsers.invitations[0].workspaceUserId}`);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  requireAdminRoleOrHigher(loaderArgs);

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

export default function WorkspaceHubEmployees() {
  const users = useLoaderData<typeof clientLoader>();
  const lastResult = useActionData<typeof clientAction>();
  const [addUserPopupOpen, setAddUserPopupOpen] = useState(false);
  const goBackToPage = useGoBackToPage();

  useEffect(() => {
    if (lastResult && lastResult.status === Status.Success) {
      setAddUserPopupOpen(false);
    }
  }, [lastResult]);

  useEffect(() => {
    goBackToPage(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("workspaceEmployees.employees"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <EmployeesCard users={users} onClick={() => setAddUserPopupOpen(true)} />
      <AddEmployeeDialogForm
        open={addUserPopupOpen}
        onClose={() => setAddUserPopupOpen(false)}
      />
    </AppLayout>
  );
}
