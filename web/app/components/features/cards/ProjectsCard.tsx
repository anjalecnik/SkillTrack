import { CardLayout } from "~/components/layout";
import { ProjectsCardHeader, ProjectTable } from "~/components/features";
import { IProject, PaginatedResponse } from "~/types";
import { useGoBackToPage, useNavigationState } from "~/hooks";
import { useNavigate } from "@remix-run/react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface IProjectsCardProps {
  onAddClick: () => void;
  onDeleteClick: () => void;
  projects: PaginatedResponse<IProject> | null;
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
}

export function ProjectsCard({
  onAddClick,
  onDeleteClick,
  projects,
  selected,
  setSelected,
}: IProjectsCardProps) {
  const { isLoading } = useNavigationState();
  const navigate = useNavigate();
  const goBackToPage = useGoBackToPage();

  const handleProjectClick = (id: number) => {
    navigate(`${id}`);
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    items: IProject[]
  ) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (
    event: React.MouseEvent<unknown>,
    id: number
  ) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  useEffect(() => {
    goBackToPage(projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <CardLayout>
      <ProjectsCardHeader
        onAddClick={onAddClick}
        onDeleteClick={onDeleteClick}
        selected={selected}
      />
      <ProjectTable
        items={projects?.data ?? []}
        meta={{
          total: projects?.meta?.total,
          page: projects?.meta?.page,
          limit: 10,
        }}
        isLoading={isLoading}
        onItemClick={handleProjectClick}
        onSelectAllClick={handleSelectAllClick}
        onCheckboxClick={handleCheckboxClick}
        selected={selected}
      />
    </CardLayout>
  );
}
