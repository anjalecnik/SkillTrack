import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";
import { RightOutlined } from "@ant-design/icons";

export default function AccordionSummary(
  theme: Theme
): ComponentOverrideType<"MuiAccordionSummary"> {
  const { palette, spacing } = theme;

  return {
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <RightOutlined style={{ fontSize: "0.75rem" }} />,
      },
      styleOverrides: {
        root: {
          backgroundColor: palette.secondary.lighter,
          flexDirection: "row-reverse",
          minHeight: 46,
        },
        expandIconWrapper: {
          "&.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        },
        content: {
          marginTop: spacing(1.25),
          marginBottom: spacing(1.25),
          marginLeft: spacing(1),
        },
      },
    },
  };
}
