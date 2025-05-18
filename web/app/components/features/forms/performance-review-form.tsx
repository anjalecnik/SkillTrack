import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  FlexColumn,
  FormDateInput,
  FormEnumSelect,
} from "~/components/common";
import { RadioGroupInput } from "~/components/common/inputs/RadioGroupInput";
import { IUser } from "~/types";
import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";
import { fullNameFormatter } from "~/util";

interface IPerformanceReviewFormProps {
  employees?: IUser[];
  defaultValues?: IActivityPerformanceReviewForm;
  isEditing?: boolean;
  isViewing?: boolean;
}

export function PerformanceReviewForm({
  employees,
  defaultValues,
  isEditing,
  isViewing,
}: IPerformanceReviewFormProps) {
  const { t } = useTranslation();

  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => setFormValues(defaultValues), [defaultValues]);

  return (
    <FlexColumn gap={"20px"}>
      <input type="hidden" name="activityId" value={formValues?.activityId} />

      <Autocomplete
        name="employeeId"
        label={t("workspacePerformanceReviews.employeeName")}
        options={employees ?? []}
        value={employees?.find(
          (employee) => employee.id === formValues?.employeeId
        )}
        onChange={(_e, value) =>
          setFormValues((prev) => ({ ...prev, employeeId: value }))
        }
        getOptionLabel={(employee) =>
          employee ? fullNameFormatter(employee) || "" : "/"
        }
        disabled={isEditing || isViewing}
        required
      />

      <FormDateInput
        fieldName="year"
        views={["year"]}
        label={t("workspacePerformanceReviews.year")}
        defaultValue={
          formValues?.year ? dayjs(`${formValues.year}-01-01`) : undefined
        }
        value={formValues?.year ? dayjs(`${formValues.year}-01-01`) : undefined}
        format="YYYY"
        maxDate={dayjs().startOf("year")}
        onChange={(newValue) =>
          setFormValues((prev) => ({ ...prev, year: newValue?.year() }))
        }
        disabled={isEditing || isViewing}
        required
      />

      <FormEnumSelect<PerformanceReviewQuartal>
        fieldName="quartal"
        defaultValue={formValues?.quartal}
        enumType={PerformanceReviewQuartal}
        label={t("workspacePerformanceReviews.quarter")}
        onChange={(e) =>
          setFormValues((prev) => ({
            ...prev,
            quartal: Object.values(PerformanceReviewQuartal).find(
              (value) => value === e.target.value
            ),
          }))
        }
        disabled={isEditing || isViewing}
        required
      />

      <RadioGroupInput
        name="answer1"
        label={t("workspacePerformanceReviews.question1")}
        options={[
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
        ]}
        value={formValues?.answer1 ?? null}
        onChange={(value) =>
          setFormValues((prev) => ({ ...prev, answer1: Number(value) }))
        }
        disabled={isViewing}
        ratingScale
        required
      />

      <RadioGroupInput
        name="answer2"
        label={t("workspacePerformanceReviews.question2")}
        options={[
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
        ]}
        value={formValues?.answer2 ?? null}
        onChange={(value) =>
          setFormValues((prev) => ({ ...prev, answer2: Number(value) }))
        }
        disabled={isViewing}
        ratingScale={true}
        required
      />

      <RadioGroupInput
        name="answer3"
        label={t("workspacePerformanceReviews.question3")}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={formValues?.answer3 ?? null}
        onChange={(value) =>
          setFormValues((prev) => ({ ...prev, answer3: Boolean(value) }))
        }
        disabled={isViewing}
        required
      />

      <RadioGroupInput
        name="answer4"
        label={t("workspacePerformanceReviews.question4")}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={formValues?.answer4 ?? null}
        onChange={(value) =>
          setFormValues((prev) => ({ ...prev, answer4: Boolean(value) }))
        }
        disabled={isViewing}
        required
      />
    </FlexColumn>
  );
}
