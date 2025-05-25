import { FlexColumn } from "~/components/common";
import { CardLayout } from "~/components/layout";
import { ProjectDetailsCard } from "~/components/features";
import {
  IProject,
  IUserResponse,
  WorkspaceProjectAccordions as Accordions,
} from "~/types";
import { SubmissionResult } from "@conform-to/react";
import { useFormAccordions } from "~/hooks";
import { ProjectSettings } from "./ProjectSettings";

interface IProjectCardProps {
  lastResult: SubmissionResult<string[]> | null;
  loaderData: {
    project: IProject;
    users: IUserResponse[];
    projects: IProject[];
  };
}

export function ProjectCard({ loaderData, lastResult }: IProjectCardProps) {
  const { project } = loaderData;

  // Get all accordion values from the enum
  const accordionValues = Object.values(Accordions);
  const {
    accordionStates,
    loadingStates,
    cancelStates,
    lastResults,
    toggleAccordion,
    toggleCancelState,
  } = useFormAccordions<Accordions>(accordionValues, lastResult, [
    Accordions.Employees,
  ]);

  return (
    <CardLayout>
      <FlexColumn gap="20px">
        <ProjectDetailsCard project={project!} />
        <ProjectSettings
          lastResults={lastResults}
          loaderData={loaderData}
          accordionStates={accordionStates}
          toggleAccordion={toggleAccordion}
          toggleCancelState={toggleCancelState}
          loadingStates={loadingStates}
          cancelStates={cancelStates}
        />
      </FlexColumn>
    </CardLayout>
  );
}
