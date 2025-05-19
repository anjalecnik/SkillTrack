import { InputLabel, Typography, useTheme } from "@mui/material";
import { Flex, FlexColumn } from "~/components/common";

interface MultipleInputsContainerProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
}

export const MultipleInputsContainer = ({
  children,
  label,
  required,
}: MultipleInputsContainerProps) => {
  const theme = useTheme();

  if (!label) {
    return (
      <Flex width="100%" gap="20px">
        {children}
      </Flex>
    );
  }

  return (
    <FlexColumn width="100%" gap="4px">
      <Flex gap="4px">
        {required && (
          <Typography
            sx={{
              color: theme.palette.customColors.red.main,
            }}
          >
            *
          </Typography>
        )}
        <InputLabel>{label}</InputLabel>
      </Flex>
      <Flex width="100%" gap="20px">
        {children}
      </Flex>
    </FlexColumn>
  );
};
