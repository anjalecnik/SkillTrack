import { Typography, useTheme } from "@mui/material";
import { Fragment } from "react";
import { IBreadcrumbListItems, BreadcrumbVariant } from "~/types";

interface IBreadcrumb {
  list: IBreadcrumbListItems[];
}

export function HeaderBreadcrumbs({ list }: IBreadcrumb) {
  const theme = useTheme();
  if (!list.length) return;

  return (
    <>
      {list.map((item, index) => (
        <Fragment key={index}>
          {item.variant === BreadcrumbVariant.Other && (
            <Typography variant="body1" marginLeft="8px">
              /
            </Typography>
          )}

          <Typography
            variant={
              item.variant === BreadcrumbVariant.Current ? "h4" : "body1"
            }
            data-testid={item.dataTestId}
            onClick={item.onClick}
            sx={{
              color:
                item.variant === BreadcrumbVariant.Other
                  ? theme.palette.text.secondary
                  : "inherit",
              whiteSpace: "nowrap",
              wordBreak: "break-word",
              ":hover":
                item.variant === BreadcrumbVariant.Previous
                  ? {
                      cursor: "pointer",
                      textDecoration: "underline",
                    }
                  : undefined,
            }}
          >
            {item.text} {item.variant === BreadcrumbVariant.Previous && "/"}
          </Typography>
        </Fragment>
      ))}
    </>
  );
}
