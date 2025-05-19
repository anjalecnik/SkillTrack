import { AssignedVacations } from "~/types";
import {
  Flex,
  FlexColumn,
  FormDateInput,
  FormTextInput,
} from "~/components/common";
import { useTranslation } from "react-i18next";
import { DEFAULT_PROJECT_DATE_FORMAT, CURRENT_YEAR } from "~/constants";
import { FormControlLabel, Switch } from "@mui/material";

interface IVacationsInitialMigrationFormProps {
  index: number;
  vacations: Partial<AssignedVacations>[];
  isInitialMigrationOfVacationYear: boolean;
  handleIsInitialMigration?: (
    e: React.SyntheticEvent,
    checked: boolean
  ) => void;
}

export function VacationsInitialMigrationForm({
  isInitialMigrationOfVacationYear,
  vacations,
  index,
  handleIsInitialMigration,
}: IVacationsInitialMigrationFormProps) {
  const { t } = useTranslation();

  const currentVacationYearData = vacations.find(
    (vacation) => Number(vacation.year) === CURRENT_YEAR
  );

  const hasInitialMigrationInAnyVacationYear = vacations.some(
    (vacation) => vacation.initialDate
  );

  const hasInitialMigrationInCurrentYear = vacations.some(
    (vacation) => vacation.initialDate && vacation.year === CURRENT_YEAR
  );

  const showInitialMigrationForm =
    isInitialMigrationOfVacationYear && currentVacationYearData !== undefined;

  return (
    <>
      {(!hasInitialMigrationInAnyVacationYear ||
        hasInitialMigrationInCurrentYear) && (
        <Flex>
          <FormControlLabel
            control={
              <Switch
                checked={isInitialMigrationOfVacationYear}
                onChange={handleIsInitialMigration}
              />
            }
            label={t("common.initialMigration")}
            labelPlacement="end"
            sx={{ ml: "1px" }}
          />
        </Flex>
      )}
      <FlexColumn
        sx={{
          display: showInitialMigrationForm ? "inherit" : "none",
        }}
      >
        <Flex gap="15px">
          <FormDateInput
            fieldName={`assignedVacations[${index}].initialDate`}
            label={t("common.migrationDate")}
            containerProps={{ sx: { flex: 1 } }}
            format={DEFAULT_PROJECT_DATE_FORMAT}
            required={showInitialMigrationForm}
          />
          <FormTextInput
            fieldName={`assignedVacations[${index}].initialUsedDays`}
            label={t("workspaceEmployees.usedDays")}
            defaultValue={currentVacationYearData?.initialUsedDays}
            containerProps={{ sx: { flex: 1 } }}
            required={showInitialMigrationForm}
          />
        </Flex>
      </FlexColumn>
    </>
  );
}
