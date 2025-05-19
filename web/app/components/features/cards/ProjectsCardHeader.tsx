import { t } from "i18next";
import { Button, Flex, SearchField } from "~/components/common";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useMobile } from "~/hooks";

interface IProjectsCardHeaderProps {
  onDeleteClick: () => void;
  onAddClick: () => void;
  selected: number[];
}

export function ProjectsCardHeader({
  onDeleteClick,
  onAddClick,
  selected,
}: IProjectsCardHeaderProps) {
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
        color="error"
        startIcon={<DeleteOutlined />}
        onClick={onDeleteClick}
        disabled={selected.length === 0}
      >
        {t("common.delete")}
      </Button>
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
