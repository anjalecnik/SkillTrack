import { ButtonProps } from "@mui/material";
import React from "react";
import { Button } from "./Button";

interface ISquareButtonProps extends ButtonProps {
  width?: number;
  children: React.ReactNode;
}

export function SquareButton({
  width = 40,
  children,
  ...rest
}: ISquareButtonProps) {
  return (
    <Button
      {...rest}
      type="submit"
      sx={{
        minWidth: width,
        width: width,
      }}
    >
      {children}
    </Button>
  );
}
