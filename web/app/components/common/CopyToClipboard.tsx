import { Link, Tooltip, useTheme } from "@mui/material";
import { displaySuccess } from "~/util";
import { t } from "i18next";

interface ICopyToClipboard {
  title: React.ReactNode;
  plainText?: boolean;
  children: React.ReactNode;
}

export function CopyToClipboard({
  title,
  plainText,
  children,
}: ICopyToClipboard) {
  const theme = useTheme();

  function handleCopyToClipboard() {
    const textToCopy =
      typeof children === "string"
        ? children
        : (children as JSX.Element).props.children;
    navigator.clipboard.writeText(textToCopy);
    displaySuccess(t("common.succesfullyCopied"));
  }

  return (
    <Tooltip title={title}>
      <Link
        style={{ cursor: "pointer" }}
        color={
          plainText ? theme.palette.secondary.dark : theme.palette.primary.main
        }
        onClick={handleCopyToClipboard}
      >
        {children}
      </Link>
    </Tooltip>
  );
}
