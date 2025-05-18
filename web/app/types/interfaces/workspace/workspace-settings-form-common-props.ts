import { SubmissionResult } from "@conform-to/react";
import { WorkspaceSettingsAccordions, IWorkspace } from "~/types";

export interface IWorkspaceSettingsFormCommonProps {
  lastResult: SubmissionResult<string[]> | null;
  workspace: IWorkspace;
  open: boolean;
  onAccordionClick: (id: WorkspaceSettingsAccordions) => void;
  onCancelClick: () => void;
  intent: WorkspaceSettingsAccordions;
  isLoading: boolean;
  isCancelPressed?: boolean;
}
