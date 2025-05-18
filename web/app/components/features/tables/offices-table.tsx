import React from "react";
import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { Flex, FlexColumn , PaginatedTable } from "~/components/common";
import { IOffice, ITableMeta } from "~/types";
import { t } from "i18next";

interface IOfficeTableProps {
  items: IOffice[];
  meta?: ITableMeta;
  isLoading?: boolean;
  onItemClick?: (office: IOffice) => void;
  onCreateClick?: (e: React.MouseEvent<unknown>) => void;
  onEditClick?: (e: React.MouseEvent<unknown>, item: IOffice) => void;
  onDeleteClick?: (e: React.MouseEvent<unknown>, item: IOffice) => void;
}

export function OfficesTable({
  items,
  meta,
  isLoading,
  onItemClick,
  onCreateClick,
  onEditClick,
  onDeleteClick,
}: IOfficeTableProps) {
  const theme = useTheme();
  return (
    <>
      <PaginatedTable
        emptyMessage={
          onCreateClick ? (
            <TableRow
              sx={{
                width: "100%",
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: "4px",
                ":hover": { backgroundColor: theme.palette.grey[100] },
              }}
              onClick={onCreateClick}
            >
              <Flex
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  padding: "20px",
                }}
              >
                <Flex
                  sx={{
                    width: "128px",
                    height: "128px",
                    borderRadius: "50%",
                    border: `1px dashed ${theme.palette.primary.main}`,
                    backgroundColor: "#E6F7FF",
                  }}
                >
                  <FlexColumn
                    sx={{ margin: "auto", textAlign: "center", gap: "8px" }}
                  >
                    <HomeOutlined
                      style={{ fontSize: 48, color: theme.palette.grey[500] }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.grey[500],
                      }}
                    >
                      {t("workspaceReservations.office")}
                    </Typography>
                  </FlexColumn>
                </Flex>
                <Typography>
                  {t("workspaceReservations.createNewOffice")}
                </Typography>
              </Flex>
            </TableRow>
          ) : (
            <TableRow sx={{ width: "100%", textAlign: "center" }}>
              <Typography>{t("common.noDataFound")}</Typography>
            </TableRow>
          )
        }
        meta={meta}
        isLoading={isLoading}
        headers={[
          {
            children: t("workspaceReservations.office"),
            sort: true,
            param: "name",
          },
          {
            children: t("workspaceReservations.floors"),
          },
          {
            children: t("workspaceReservations.items"),
          },
          onEditClick
            ? {
                children: t("common.actions"),
                sort: false,
                param: "actions",
              }
            : {},
        ].filter(Boolean)}
        items={items}
        render={(item) => {
          return (
            <TableRow
              key={item.id}
              sx={{ cursor: "pointer" }}
              onClick={() => onItemClick && onItemClick(item)}
            >
              <TableCell>
                <Flex alignItems="center" gap="10px">
                  <FlexColumn>
                    <Typography>{item.name}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.grey[500],
                      }}
                    >
                      {item.plan.buildings[0].address ?? "/"}
                    </Typography>
                  </FlexColumn>
                </Flex>
              </TableCell>
              <TableCell>{item.plan.buildings[0].floors.length}</TableCell>
              <TableCell>
                {item.plan.buildings[0].floors.reduce(
                  (count, current) => count + current.desks.length,
                  0
                )}
              </TableCell>
              <TableCell>
                {onEditClick && (
                  <IconButton
                    onClick={(e) => onEditClick(e, item)}
                    sx={{ color: theme.palette.grey[500], fontSize: "1.2rem" }}
                  >
                    <EditOutlined />
                  </IconButton>
                )}
                {onDeleteClick && (
                  <IconButton
                    onClick={(e) => onDeleteClick(e, item)}
                    sx={{ color: theme.palette.grey[500], fontSize: "1.2rem" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          );
        }}
      />
    </>
  );
}
