import { DeleteOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "@mui/material";

export interface IRemoveButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function RemoveButton({ children, ...rest }: IRemoveButtonProps) {
  return (
    <Button
      {...rest}
      variant="dashed"
      type="submit"
      startIcon={<DeleteOutlined />}
      color="warning"
      sx={{
        width: "200px",
      }}
    >
      {children}
    </Button>
  );
}
