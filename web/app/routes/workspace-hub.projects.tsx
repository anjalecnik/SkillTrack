import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  AddProjectDialogForm,
  DeleteProjectsWarningDialog,
  ProjectsCard,
} from "~/components/features";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { handleAxiosError, requireAdminRoleOrHigher } from "~/util";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { parseWithZod } from "@conform-to/zod";
import { BreadcrumbVariant, Status } from "~/types";
import {
  addProjectFormSchema,
  addProjectAndDetailsSchema,
  multipleDeleteSchema,
} from "~/schemas";
import { displaySuccess } from "~/util/snackbar-success";
import { t } from "i18next";
import { z } from "zod";
import { DEFAULT_PAGINATION_LIMIT } from "~/constants";
import { ProjectClient } from "~/clients";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();

  const submission = parseWithZod(formData, {
    schema: z.discriminatedUnion("intent", [
      addProjectFormSchema,
      addProjectAndDetailsSchema,
      multipleDeleteSchema,
    ]),
  });

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  try {
    switch (submission.value.intent) {
      case "createAndAddMoreDetails":
      case "create": {
        const { name } = submission.value;

        const project = await ProjectClient.addProject({
          name,
        });

        displaySuccess(t("workspaceProjects.addedNewProject"));

        if (submission.value.intent === "create") {
          return json(submission.reply());
        }

        return redirect(`${project.id}`);
      }
      case "delete": {
        const projectIds = JSON.parse(submission.value.ids) as number[];

        await ProjectClient.deleteProjects(projectIds);

        displaySuccess(t("workspaceProjects.projectsDeleted"));

        return json(submission.reply());
      }

      default:
        return json(submission.reply());
    }
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  requireAdminRoleOrHigher(loaderArgs);

  try {
    const projects = await ProjectClient.getProjects(loaderArgs, {
      limit: DEFAULT_PAGINATION_LIMIT,
      metadata: true,
    });

    return json(projects);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export default function WorkspaceHubProjects() {
  const lastResult = useActionData<typeof clientAction>();
  const projects = useLoaderData<typeof clientLoader>();
  const [selected, setSelected] = useState<number[]>([]);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const { t } = useTranslation();
  const [addProjectPopupOpen, setAddProjectPopupOpen] = useState(false);

  useEffect(() => {
    if (lastResult?.status === Status.Success) {
      switch (lastResult?.initialValue?.intent) {
        case "create":
          setAddProjectPopupOpen(false);
          break;
        case "delete":
          setDeletePopupOpen(false);
          setSelected([]);
          break;
        default:
          break;
      }
    }
  }, [lastResult]);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("workspaceProjects.projects"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <ProjectsCard
        setSelected={setSelected}
        projects={projects}
        onAddClick={() => setAddProjectPopupOpen(true)}
        onDeleteClick={() => setDeletePopupOpen(true)}
        selected={selected}
      />
      <AddProjectDialogForm
        open={addProjectPopupOpen}
        onClose={() => setAddProjectPopupOpen(false)}
        //lastResult={lastResult}
        selected={selected}
      />
      <DeleteProjectsWarningDialog
        setDeletePopupOpen={setDeletePopupOpen}
        id={selected}
        open={deletePopupOpen}
        // lastResult={lastResult}
        projects={projects}
        selected={selected}
      />
    </AppLayout>
  );
}
