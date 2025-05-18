import { SubmissionResult } from "@conform-to/react";
import { IWorkspace, WorkspaceSettingsAccordions as Accordions } from "~/types";

type SettingsAccordionStates = {
  [key in Accordions]: boolean;
};

type SettingsLastResultStates = {
  [key in Accordions]: SubmissionResult<string[]> | null;
};

export interface SettingsCardProps {
  lastResult: SettingsLastResultStates;
  workspace: IWorkspace;
  accordionStates: SettingsAccordionStates;
  cancelStates: SettingsAccordionStates;
  toggleAccordion: (id: Accordions) => void;
  toggleCancelState: (id: Accordions) => void;
  loadingStates: Record<Accordions, boolean>;
}
