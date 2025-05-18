import { LoadingButton } from "@mui/lab";
import type { ButtonProps } from "@mui/material";

// NOTE: using the LoadingButtonProps interface from @mui/lab freezes tsc compilation
// https://github.com/mui/material-ui/issues/30038
interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingPosition?: "start" | "end" | "center";
}

export const Button: React.FC<LoadingButtonProps> = (
  props: LoadingButtonProps
) => {
  const { children, ...rest } = props;

  return <LoadingButton {...rest}>{children}</LoadingButton>;
};
