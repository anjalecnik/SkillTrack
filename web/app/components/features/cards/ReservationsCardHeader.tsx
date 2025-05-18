import { t } from "i18next";
import { Button, Flex, SearchField } from "~/components/common";
import { PlusOutlined } from "@ant-design/icons";
import { useIsAdminRoute, useMobile } from "~/hooks";

interface IReservationsCardHeader {
  onAddClick: () => void;
}

export function ReservationsCardHeader({
  onAddClick,
}: IReservationsCardHeader) {
  const isMobile = useMobile();
  const isAdminRoute = useIsAdminRoute();

  return (
    <Flex
      justifyContent="end"
      gap="16px"
      paddingBottom="16px"
      sx={{ ...(isMobile && { flexDirection: "column" }) }}
    >
      <SearchField param="search" placeholder={t("common.inputSearchText")!} />
      {isAdminRoute && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusOutlined />}
          onClick={onAddClick}
        >
          {t("workspaceReservations.addOffice")}
        </Button>
      )}
    </Flex>
  );
}
