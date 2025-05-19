import { PlusOutlined } from "@ant-design/icons";
import { useSearchParams } from "@remix-run/react";
import dayjs, { Dayjs } from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormDateInput,
  FormWrapper,
  SearchField,
} from "~/components/common";
import { useMobile } from "~/hooks";
import { monthSelectFormSchema as schema } from "~/schemas/activities/performance-review-form-schema";

interface IPerformanceReviewCardHeader {
  onClick: () => void;
}

export function PerformanceReviewCardHeader({
  onClick,
}: IPerformanceReviewCardHeader) {
  const isMobile = useMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(dayjs());

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const params = new URLSearchParams(searchParams);
      params.set("year", newDate.format("YYYY"));
      setSearchParams(params, { replace: true });
    }
  };

  useEffect(() => {
    const dateValue = searchParams.get("year");

    if (dateValue) {
      setValue(dayjs(dateValue, "YYYY"));
    }
  }, [searchParams]);

  return (
    <Flex
      paddingBottom="20px"
      sx={{ ...(isMobile && { flexDirection: "column" }) }}
    >
      <Flex
        flex="1"
        textAlign="left"
        sx={{ ...(isMobile && { flexDirection: "column" }) }}
      >
        <FormWrapper schema={schema} id="year-select-form" intent="yearSelect">
          <FormDateInput
            fieldName="selectYear"
            views={["year"]}
            containerProps={{ sx: { flex: 1 } }}
            format="YYYY"
            defaultValue={value}
            maxDate={dayjs().add(1, "year").startOf("year")}
            onChange={handleDateChange}
            required
          />
        </FormWrapper>
      </Flex>

      <Flex
        justifyContent="space-between"
        alignItems="end"
        gap="10px"
        sx={{ ...(isMobile && { flexDirection: "column" }) }}
      >
        <SearchField
          param="search"
          placeholder={t("workspacePerformanceReviews.searchByEmployee")!}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusOutlined />}
          onClick={onClick}
        >
          {t("common.addNew")}
        </Button>
      </Flex>
    </Flex>
  );
}
