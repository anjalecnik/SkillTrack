import { t } from "i18next";
import { Button, Flex, SearchField } from "~/components/common";
import { PlusOutlined } from "@ant-design/icons";
import { useMobile } from "~/hooks";

interface IPositionsCardHeaderProps {
  onAddClick: () => void;
}

export function PositionsCardHeader({ onAddClick }: IPositionsCardHeaderProps) {
  const isMobile = useMobile();
  return (
    <Flex
      gap="10px"
      justifyContent="end"
      paddingBottom="20px"
      sx={{ ...(isMobile && { flexDirection: "column" }) }}
    >
      <SearchField param="search" placeholder={t("common.inputSearchText")!} />
      <Button
        variant="contained"
        color="primary"
        startIcon={<PlusOutlined />}
        onClick={onAddClick}
      >
        {t("common.addNew")}
      </Button>
    </Flex>
  );
}
