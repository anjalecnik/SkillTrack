import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { Button, Flex, SearchField } from "~/components/common";
import { useMobile } from "~/hooks";

interface IEmployeesCardHeaderProps {
  onClick?: () => void;
}

export function EmployeesCardHeader({ onClick }: IEmployeesCardHeaderProps) {
  const isMobile = useMobile();
  return (
    <Flex
      gap="10px"
      justifyContent="end"
      paddingBottom="20px"
      sx={{ ...(isMobile && { flexDirection: "column" }) }}
    >
      <SearchField param="search" placeholder={t("common.inputSearchText")!} />
      {onClick && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusOutlined />}
          onClick={onClick}
          data-testid="addEmployeeBtn"
        >
          {t("common.addNew")}
        </Button>
      )}
    </Flex>
  );
}
