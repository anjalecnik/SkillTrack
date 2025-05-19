import { forwardRef } from "react";
import { StyledComponent } from "@emotion/styled";
import { Box, BoxProps, styled } from "@mui/material";

const startEndCenterMapper = (value: string) => {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    default:
      return value;
  }
};

export type JustifyContent =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly";

const justifyContentMapper = (value: JustifyContent) =>
  startEndCenterMapper(value);

export type AlignItems = "start" | "center" | "end" | "stretch" | "baseline";

const alignItemsMapper = (value: AlignItems) => startEndCenterMapper(value);

export type AlignContent =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "stretch";

const alignContentMapper = (value: AlignContent) => startEndCenterMapper(value);

export interface CustomFlexProps {
  direction?: "row" | "column" | "column-reverse" | "row-reverse";
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  wrap?: "wrap" | "nowrap";
  center?: boolean;
}

export type FlexProps = CustomFlexProps & Omit<BoxProps, "center">;

/**
 * https://mui.com/system/flexbox/
 */
export const Flex: StyledComponent<FlexProps> = styled(Box, {
  shouldForwardProp: (prop: string) =>
    ![
      "display",
      "flexDirection",
      "justifyContent",
      "alignItems",
      "flexWrap",
      "alignContent",
    ].includes(prop),
})<FlexProps>(
  ({
    direction = "row",
    justifyContent,
    alignItems,
    wrap,
    alignContent,
    center,
  }: FlexProps) => ({
    display: "flex",
    flexDirection: direction,
    justifyContent: center
      ? "center"
      : justifyContentMapper(justifyContent as JustifyContent),
    alignItems: center ? "center" : alignItemsMapper(alignItems as AlignItems),
    alignContent: alignContentMapper(alignContent as AlignContent),
    flexWrap: wrap,
  })
);

export const FlexColumn = forwardRef((props: FlexProps, ref) => {
  return (
    <Flex direction="column" {...props} ref={ref}>
      {props.children}
    </Flex>
  );
});
FlexColumn.displayName = "FlexColumn";

export const PaddedFlexColumn = forwardRef((props: FlexProps, ref) => {
  return (
    <Flex direction="column" gap="20px" padding="20px" {...props} ref={ref}>
      {props.children}
    </Flex>
  );
});
PaddedFlexColumn.displayName = "PaddedFlexColumn";

export const CenteredFlexColumn = forwardRef((props: FlexProps, ref) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      {...props}
      ref={ref}
    >
      {props.children}
    </Flex>
  );
});
CenteredFlexColumn.displayName = "CenteredFlexColumn";
