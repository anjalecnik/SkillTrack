import { PlusOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "@mui/material";

export interface IAddItemButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function AddItemButton({ children, ...rest }: IAddItemButtonProps) {
  return (
    <Button
      {...rest}
      variant="outlined"
      type="submit"
      color="primary"
      sx={{
        ...rest.sx,
        borderColor: "primary.main",
        color: "#8C8C8C",
      }}
      startIcon={<PlusOutlined />}
    >
      {children}
    </Button>
  );
}
