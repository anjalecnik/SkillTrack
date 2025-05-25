import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  json,
  ShouldRevalidateFunctionArgs,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { t } from "i18next";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  formatDate,
  handleAxiosError,
  isEndDateGreaterToStartDate,
  requireAdminRoleOrHigher,
} from "~/util";
import { ProjectCard } from "~/components/features";
import {
  WorkspaceProjectAccordions as Accordions,
  BreadcrumbVariant,
  IProjectUpdateRequest,
  IWorkspaceUserUpdateReq,
  Status,
  WorkspaceProjectUserRole,
} from "~/types";
import {
  projectInfoFormSchema,
  employeeAssignFormSchema,
  ProjectInfoFormSubmissionType,
} from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { displaySuccess } from "~/util/snackbar-success";
import { WORKSPACE_HUB_PATH } from "~/constants";
import { SubmissionResult } from "@conform-to/react";
import { ProjectClient, UserClient } from "~/clients";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();

  const submission = parseWithZod(formData, {
    schema: z
      .discriminatedUnion("intent", [
        projectInfoFormSchema,
        employeeAssignFormSchema,
      ])
      .refine(
        (data) => {
          switch (data.intent) {
            case Accordions.ProjectInfo: {
              const { dateStart, dateEnd } =
                data as ProjectInfoFormSubmissionType;
              if (!dateEnd) {
                return true;
              }
              return isEndDateGreaterToStartDate(
                dateStart,
                dateEnd,
                "DD. MMM, YYYY"
              );
            }
            default:
              return true;
          }
        },
        { message: "error.endDateBeforeStartDate", path: ["dateEnd"] }
      ),
  });

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  try {
    switch (submission.value.intent) {
      case Accordions.ProjectInfo: {
        const projectRequest: IProjectUpdateRequest = {
          name: submission.value.name,
          dateStart: formatDate(submission.value.dateStart, "DD. MMM, YYYY"),
          dateEnd:
            formatDate(submission.value.dateEnd, "DD. MMM, YYYY") ?? null,
        };
        await ProjectClient.updateProject(actionArgs, projectRequest);
        break;
      }
      case Accordions.Employees: {
        const user: IWorkspaceUserUpdateReq = {
          projects: submission.value.projects.map((project) => ({
            id: project.id,
            role:
              project?.isProjectLead === "on"
                ? WorkspaceProjectUserRole.Lead
                : WorkspaceProjectUserRole.Member,
          })),
        };
        await UserClient.updateUser(user, actionArgs, submission.value.userId);
        break;
      }
    }

    displaySuccess(t("workspaceProjects.projectUpdated"));
    return json(submission.reply());
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  requireAdminRoleOrHigher(loaderArgs);

  const [project, projects, users] = await Promise.all([
    ProjectClient.getProjectById(loaderArgs),
    ProjectClient.getProjects(loaderArgs, { metadata: true }),
    UserClient.getUsers(loaderArgs),
  ]);
  return json({ project, projects: projects.data, users: users.data });
};

export const shouldRevalidate = ({
  actionResult,
}: ShouldRevalidateFunctionArgs) => {
  if (!actionResult || actionResult.status !== Status.Success) {
    return false;
  }

  const { intent } = actionResult;
  return intent?.type !== "remove" && intent?.type !== "insert";
};

export default function ProjectDetails() {
  const lastResult = useActionData<typeof clientAction>() as SubmissionResult<
    string[]
  >;
  const loaderData = useLoaderData<typeof clientLoader>();
  const { project } = loaderData;
  const navigate = useNavigate();

  function handleBackClick() {
    navigate(`${WORKSPACE_HUB_PATH}/projects`);
  }

  if (!project) {
    throw Error(t("error.somethingWentWrong") as string);
  }

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("workspaceProjects.projects"),
            variant: BreadcrumbVariant.Previous,
            onClick: handleBackClick,
          },
          { text: project.name || "/", variant: BreadcrumbVariant.Current },
        ]}
      />
      <ProjectCard loaderData={loaderData} lastResult={lastResult} />
    </AppLayout>
  );
}
