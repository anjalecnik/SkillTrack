import { FlexColumn, FlexProps } from "./Flex";

export interface PageContainerProps extends FlexProps {
  children?: React.ReactNode;
}

export const PageContainer = ({ children, ...rest }: PageContainerProps) => {
  return (
    <FlexColumn width="100%" minHeight="100vh" {...rest}>
      {children}
    </FlexColumn>
  );
};
