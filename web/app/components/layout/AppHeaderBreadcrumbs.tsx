import { Flex, IconButton } from "~/components/common";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { HeaderBreadcrumbs } from "~/components/layout";
import { IBreadcrumbListItems } from "~/types";

export interface IAppHeaderBreadcrumbsProps {
  onBackClick?: () => void;
  list: IBreadcrumbListItems[];
}

export function AppHeaderBreadcrumbs({
  onBackClick,
  list,
}: IAppHeaderBreadcrumbsProps) {
  return (
    <Flex alignItems="center" sx={{ margin: "10px 20px 30px 10px" }} gap="5px">
      {onBackClick && (
        <IconButton color="default" onClick={onBackClick}>
          <ArrowLeftOutlined />
        </IconButton>
      )}
      <HeaderBreadcrumbs list={list} />
    </Flex>
  );
}
