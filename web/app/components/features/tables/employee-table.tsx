import {
  TableRow,
  TableCell,
  Chip,
  Typography,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Flex,
  FlexColumn,
  PaginatedTable,
  Avatar,
  FormDialog,
} from "~/components/common";
import { ITableMeta, IUserResponse, UserStatus } from "~/types";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { StatusFlowBody } from "~/components/features";

export interface IEmployeeTableProps {
  items: IUserResponse[];
  meta?: ITableMeta;
  isLoading?: boolean;
  onItemClick: (id: number) => void;
}

export function EmployeeTable({
  items,
  meta,
  isLoading,
  onItemClick,
}: IEmployeeTableProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <PaginatedTable
        isLoading={isLoading}
        headers={[
          {
            children: t("workspaceEmployees.employeeName"),
            sort: true,
            param: "name",
          },
          { children: t("workspaceEmployees.workPosition") },
          { children: t("workspaceEmployees.averageScore") },
          {
            children: (
              <>
                {t("workspaceEmployees.status")}
                <Tooltip
                  title={t("workspaceEmployees.statusInfo")}
                  placement="top"
                >
                  <InfoCircleOutlined
                    style={{
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                    onClick={() => setOpen(true)}
                  />
                </Tooltip>
              </>
            ),
            filter: {
              options: [
                {
                  value: UserStatus.Active,
                  label: t("workspaceEmployees.active"),
                },
                {
                  value: UserStatus.Deactivated,
                  label: t("workspaceEmployees.deactivated"),
                },
                {
                  value: UserStatus.Invited,
                  label: t("workspaceEmployees.invitationPending"),
                },
              ],
              param: "status",
              multiple: true,
            },
            param: "status",
          },
        ]}
        render={(item) => (
          <Tooltip
            title={t("workspaceEmployees.editUserDetails")}
            placement="top"
            key={item.id}
          >
            <TableRow
              key={item.id}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => onItemClick(item.id)}
            >
              <TableCell>
                <Flex alignItems={"center"} gap="10px">
                  <Avatar
                    avatarId={item.id}
                    name={`${item.name} ${item.surname}`}
                    size="40px"
                    fontSize="16px"
                  />
                  <FlexColumn>
                    <Typography>{`${item.name} ${item.surname}`}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.grey[500],
                      }}
                    >
                      {item.email}
                    </Typography>
                  </FlexColumn>
                </Flex>
              </TableCell>
              <TableCell>{item?.workPosition?.name ?? "/"}</TableCell>
              <TableCell>
                {item?.averageScore ? `${item.averageScore} %` : "/"}
              </TableCell>
              <TableCell>
                {item.status === UserStatus.Active ? (
                  <Chip
                    color="success"
                    label={t("workspaceEmployees.active")}
                    size="small"
                    variant="outlined"
                  />
                ) : item.status === UserStatus.Deactivated ? (
                  <Chip
                    color="error"
                    label={t("workspaceEmployees.deactivated")}
                    size="small"
                    variant="outlined"
                  />
                ) : item.status === UserStatus.Invited ? (
                  <Chip
                    color="primary"
                    label={t("workspaceEmployees.invitationPending")}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  "/"
                )}
              </TableCell>
            </TableRow>
          </Tooltip>
        )}
        items={items}
        meta={meta}
      />
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        title={t("workspaceEmployees.employeeStatusFlow")}
      >
        <StatusFlowBody />
      </FormDialog>
    </>
  );
}
