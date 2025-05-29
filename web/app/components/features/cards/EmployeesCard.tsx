import { CardLayout } from "~/components/layout";
import { EmployeesCardHeader, EmployeeTable } from "~/components/features";
import { IUserResponse, PaginatedResponse } from "~/types";
import { useNavigate } from "@remix-run/react";
import { useNavigationState } from "~/hooks";

interface IEmployeesCardProps {
  users: PaginatedResponse<IUserResponse> | null;
  onClick?: () => void;
}

export function EmployeesCard({ users, onClick }: IEmployeesCardProps) {
  const navigate = useNavigate();
  const { isLoading } = useNavigationState();

  function handleEmployeeClick(id: number) {
    navigate(`${id}`);
  }

  return (
    <CardLayout>
      <EmployeesCardHeader onClick={onClick} />
      <EmployeeTable
        items={users?.data ?? []}
        meta={{
          total: users?.meta?.total,
          page: users?.meta?.page,
          limit: 10,
        }}
        isLoading={isLoading}
        onItemClick={handleEmployeeClick}
      />
    </CardLayout>
  );
}
