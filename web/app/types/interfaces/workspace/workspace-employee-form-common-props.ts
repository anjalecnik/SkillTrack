import { SubmissionResult } from "@conform-to/react";
import { EmployeeSettingsAccordions, IWorkspaceUser } from "~/types";

export interface IWorkspaceEmployeeFormCommonProps {
  lastResult?: SubmissionResult<string[]> | null;
  workspaceUser: IWorkspaceUser;
  open: boolean;
  onAccordionClick: (id: EmployeeSettingsAccordions) => void;
  onCancelClick: () => void;
  intent: EmployeeSettingsAccordions;
  isLoading: boolean;
  isCancelPressed: boolean;
}
