import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableRow, TableCell, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Flex, PaginatedTable, IconButton } from "~/components/common";
import { IPositionResponse, WorkPositionLevel } from "~/types";

interface IWorkPositionTableProps {
  items: IPositionResponse[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  isLoading?: boolean;
  onEditClick?: (item: IPositionResponse) => void;
  onDeleteClick?: (item: IPositionResponse) => void;
}

export function WorkPositionTable({
  items,
  meta,
  isLoading,
  onEditClick,
  onDeleteClick,
}: IWorkPositionTableProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const grey = theme.palette.grey[500];

  return (
    <PaginatedTable
      isLoading={isLoading}
      headers={[
        {
          children: t("workspacePositions.workPosition"),
          sort: true,
          param: "name",
        },
        { children: t("workspacePositions.description") },
        {
          children: t("workspacePositions.level"),
          filter: {
            options: Object.values(WorkPositionLevel).map((level) => ({
              value: level,
              label: level,
            })),
            param: "levels",
            multiple: true,
          },
          sort: true,
          param: "level",
        },
        { children: t("workspacePositions.promotion") },
        { children: t("common.actions") },
      ]}
      render={(item) => (
        <TableRow key={item.id} sx={{ wordBreak: "break-word" }}>
          <TableCell>{item.name ?? "/"}</TableCell>
          <TableCell>{item?.description ?? "/"}</TableCell>
          <TableCell>{item?.level ?? "/"}</TableCell>
          <TableCell>{item?.workPromotion?.name ?? "/"}</TableCell>
          <TableCell>
            <Flex gap="10px">
              <IconButton
                onClick={() => onEditClick?.(item)}
                sx={{ color: grey, fontSize: "1.2rem" }}
              >
                <EditOutlined />
              </IconButton>
              <IconButton
                onClick={() => onDeleteClick?.(item)}
                sx={{ color: grey, fontSize: "1.2rem" }}
              >
                <DeleteOutlined />
              </IconButton>
            </Flex>
          </TableCell>
        </TableRow>
      )}
      items={items}
      meta={meta}
    />
  );
}
