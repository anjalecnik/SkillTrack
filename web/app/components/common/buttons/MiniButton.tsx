import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material";

const StyledButton = styled(LoadingButton)`
  border-color: ${({ theme }) => theme.palette.grey[500]};
  padding: 1px 8px !important;
  min-height: 16px;
`;

export const MiniButton: React.FC<LoadingButtonProps> = (
  props: LoadingButtonProps
) => {
  const { children, ...rest } = props;

  return <StyledButton {...rest}>{children}</StyledButton>;
};
