import { SubmissionResult } from "@conform-to/react";
import { IProject } from "./project";

import { WorkspaceProjectAccordions as Accordions } from "~/types/enums";
import { IWorkspaceUserResponse } from "../workspace-user";

type ProjectAccordionStates = {
  [key in Accordions]: boolean;
};

type ProjectLastResultStates = {
  [key in Accordions]: SubmissionResult<string[]> | null;
};

export interface IProjectSettingsProps {
  lastResults: ProjectLastResultStates;
  loaderData: {
    project: IProject;
    projects: IProject[];
    users: IWorkspaceUserResponse[];
  };
  accordionStates: ProjectAccordionStates;
  cancelStates: ProjectAccordionStates;
  toggleAccordion: (id: Accordions) => void;
  toggleCancelState: (id: Accordions) => void;
  loadingStates: Record<Accordions, boolean>;
}
