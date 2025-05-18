import { SubmissionResult } from "@conform-to/react";
import { IProject, WorkspaceProjectAccordions } from "~/types";

export interface IProjectFormCommonProps {
  lastResult?: SubmissionResult<string[]> | null;
  project: IProject;
  open: boolean;
  onAccordionClick: (id: WorkspaceProjectAccordions) => void;
  onCancelClick?: () => void;
  intent: WorkspaceProjectAccordions;
  isLoading: boolean;
  isCancelPressed?: boolean;
}
