import { styled, Typography, useTheme } from "@mui/material";
import { FlexColumn } from "~/components/common/containers/Flex";
import {
  Flex,
  FlexProps,
  MiniButton,
  ComponentLoader,
} from "~/components/common";
import { useTranslation } from "react-i18next";
import { StyledComponent } from "@emotion/styled";
import { ReactNode } from "react";

interface AccordionItemChildrenProps extends FlexProps {
  open: boolean;
  children: ReactNode;
}

export const AccordionItemChildren: StyledComponent<AccordionItemChildrenProps> =
  styled(FlexColumn, {
    shouldForwardProp: (prop: string) => !["open"].includes(prop),
  })<AccordionItemChildrenProps>(({ open }: AccordionItemChildrenProps) => ({
    height: open ? "auto" : 0,
    maxHeight: open ? "1000px" : 0,
    overflow: "hidden",
    transition: "max-height 0.5s",
    overflowY: "auto",
  }));

export interface IAccordionProps {
  title: string;
  titleDataTestId?: string;
  open: boolean;
  onAccordionClick(): void;
  onAccordionTitleClick?(): void;
  onCancelClick?(): void;
  borderTop?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  desc?: ReactNode;
  children?: ReactNode;
  openButtons?: ReactNode;
  closedButtons?: ReactNode;
}

export const Accordion = ({
  title,
  titleDataTestId,
  desc,
  borderTop,
  children,
  onAccordionClick,
  onAccordionTitleClick,
  onCancelClick,
  open,
  isLoading,
  disabled = false,
  openButtons,
  closedButtons,
}: IAccordionProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const accordionBgColor = disabled
    ? theme.palette.grey[200]
    : open
    ? theme.palette.grey[50]
    : theme.palette.grey[0];

  return (
    <ComponentLoader isLoading={isLoading}>
      <FlexColumn
        bgcolor={theme.palette.grey[0]}
        borderBottom={`1px solid ${theme.palette.grey[200]}`}
        borderTop={
          borderTop ? `1px solid ${theme.palette.grey[200]}` : undefined
        }
      >
        <Flex
          justifyContent="space-between"
          alignItems="start"
          alignContent="start"
          bgcolor={accordionBgColor}
          borderBottom={
            open ? `1px solid ${theme.palette.grey[200]}` : undefined
          }
          paddingX={2.5}
          paddingY={1.25}
          onClick={() => !disabled && onAccordionClick()}
        >
          <FlexColumn>
            <Typography
              data-testid={titleDataTestId}
              variant="h5"
              sx={{
                fontWeight: 500,
                cursor: onAccordionTitleClick ? "pointer" : "default",
              }}
              onClick={(event) => {
                event.stopPropagation();
                onAccordionTitleClick?.();
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.grey[500],
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 1,
                wordBreak: "break-word",
              }}
            >
              {desc}
            </Typography>
          </FlexColumn>
          <Flex gap="10px">
            {open
              ? openButtons ?? (
                  <>
                    <MiniButton
                      size="extraSmall"
                      variant="outlined"
                      disabled={disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAccordionClick();
                        onCancelClick && onCancelClick();
                      }}
                    >
                      {t("common.close")}
                    </MiniButton>
                  </>
                )
              : closedButtons ?? (
                  <>
                    <MiniButton
                      size="extraSmall"
                      variant="outlined"
                      disabled={disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAccordionClick();
                      }}
                    >
                      {t("common.open")}
                    </MiniButton>
                  </>
                )}
          </Flex>
        </Flex>
        <AccordionItemChildren open={open} overflow="hidden">
          <FlexColumn>{children}</FlexColumn>
        </AccordionItemChildren>
      </FlexColumn>
    </ComponentLoader>
  );
};
