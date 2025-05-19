import { SubmissionResult, useForm } from "@conform-to/react";
import { Chip } from "@mui/material";
import { t } from "i18next";
import { Avatar, Flex, WarningDialog } from "~/components/common";
import { useNavigationState } from "~/hooks";
import { IProject, PaginatedResponse } from "~/types";
import { multipleDeleteSchema as schema } from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { Dispatch, SetStateAction } from "react";

interface IDeleteProjectsWarningDialogProps {
  id: number | number[];
  selected: number[];
  open: boolean;
  projects: PaginatedResponse<IProject> | null;
  lastResult?: SubmissionResult<string[]> | null;
  setDeletePopupOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeleteProjectsWarningDialog({
  selected,
  open,
  projects,
  setDeletePopupOpen,
  lastResult,
  id,
}: IDeleteProjectsWarningDialogProps) {
  const { isLoading } = useNavigationState();

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onSubmit",
    id: `project-form-${selected.join("-")}`,
  });

  const selectedProjects = projects?.data.filter((project) =>
    selected.includes(project.id)
  );

  const handleDeleteCancel = () => {
    setDeletePopupOpen(false);
  };

  return (
    <WarningDialog
      formId={form.id}
      id={id}
      isLoading={isLoading}
      open={open}
      onClose={handleDeleteCancel}
      title={t("workspaceProjects.deleteProjectsTitle", {
        count: selected.length,
      })}
    >
      {selectedProjects?.map((project) => (
        <Chip
          key={project.id}
          sx={{ margin: "5px" }}
          label={
            <Flex alignItems="center" gap="10px">
              <Avatar
                avatarId={project.id}
                name={project.name}
                size="24px"
                fontSize="12px"
              />
              {project.name}
            </Flex>
          }
        />
      ))}
    </WarningDialog>
  );
}
