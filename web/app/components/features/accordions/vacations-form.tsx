import {
  AssignedVacations,
  IWorkspaceEmployeeFormCommonProps,
  Status,
} from "~/types";
import { vacationsAssignFormSchema as schema } from "~/schemas";
import { useTranslation } from "react-i18next";
import {
  Flex,
  FlexColumn,
  PaddedFlexColumn,
  FormWrapper,
  FormHiddenInput,
  FormTextInput,
  FormDateInput,
  FormArray,
  FormAccordion,
} from "~/components/common";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { formatDate } from "~/util";
import { CURRENT_YEAR, LAST_YEAR } from "~/constants";
import {
  VacationsFormHistoryList,
  VacationsInitialMigrationForm,
} from "~/components/features";

export function VacationsForm({
  lastResult,
  workspaceUser,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IWorkspaceEmployeeFormCommonProps) {
  const { t } = useTranslation();
  const [
    isInitialMigrationOfVacationYear,
    setIsInitialMigrationOfVacationYear,
  ] = useState(false);
  const assignedVacations = workspaceUser.assignedVacations || [];

  const handleIsInitialMigration = (
    e: React.SyntheticEvent,
    checked: boolean
  ) => {
    setIsInitialMigrationOfVacationYear(checked);
  };

  const shouldAddNewVacationYear =
    assignedVacations.length === 0 ||
    Math.max(...assignedVacations.map((vacation) => vacation.year || 0)) <=
      LAST_YEAR;

  const vacations = assignedVacations
    .map((vacation) => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        initialDate,
        assignedDays,
        oldVacationExpiration,
        description,
        ...rest
      } = vacation;
      return {
        ...rest,
        assignedDays: assignedDays ?? 0,
        oldVacationExpiration:
          formatDate(oldVacationExpiration, "MM-DD", "DD. MMMM") ?? undefined,
        description: description ?? "",
      };
    })
    .filter(
      (vacation) => vacation.year === CURRENT_YEAR
    ) as Partial<AssignedVacations>[];

  const oldVacations = assignedVacations.filter(
    (vacation) => vacation.year < CURRENT_YEAR
  );

  if (shouldAddNewVacationYear) {
    vacations.push({ year: CURRENT_YEAR, assignedDays: 0 });
  }

  useEffect(() => {
    if (lastResult?.status === Status.Success || isCancelPressed) {
      setIsInitialMigrationOfVacationYear(false);
    }
  }, [lastResult, isCancelPressed]);

  const formId = `vacations-form-${isLoading}-${isCancelPressed}`;

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={formId}
      shouldValidate={isInitialMigrationOfVacationYear ? "onBlur" : "onSubmit"}
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceEmployees.vacation")}
        desc={t("workspaceEmployees.vacationSubtitle")}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        borderTop
        isLoading={isLoading}
      >
        <PaddedFlexColumn>
          <FormArray<Partial<AssignedVacations>>
            fieldName="assignedVacations"
            defaultValue={vacations}
            render={(item, index) => {
              return (
                <FlexColumn gap="20px" key={index}>
                  <FormHiddenInput
                    fieldName={`assignedVacations[${index}].id`}
                    defaultValue={item?.id}
                  />
                  <Flex gap="15px">
                    <FormTextInput
                      fieldName={`assignedVacations[${index}].year`}
                      label={t("workspaceEmployees.year")}
                      containerProps={{ sx: { flex: 1 } }}
                      readonly={!isInitialMigrationOfVacationYear}
                      defaultValue={
                        isInitialMigrationOfVacationYear
                          ? undefined
                          : CURRENT_YEAR
                      }
                    />
                    <FormTextInput
                      fieldName={`assignedVacations[${index}].assignedDays`}
                      defaultValue={item?.assignedDays}
                      required
                      label={t("workspaceEmployees.assignedDays")}
                      containerProps={{ sx: { flex: 1 } }}
                    />
                  </Flex>
                  <Flex>
                    <FormDateInput
                      label={t("workspaceSettings.oldVacationExpirationDate")}
                      fieldName={`assignedVacations[${index}].oldVacationExpiration`}
                      defaultValue={dayjs(
                        item?.oldVacationExpiration,
                        "DD. MMMM"
                      )}
                      format="DD. MMMM"
                      containerProps={{ sx: { flex: 1 } }}
                    />
                  </Flex>
                  <Flex>
                    <FormTextInput
                      label={t("workspaceRequests.addComment")}
                      containerProps={{ sx: { flex: 1 } }}
                      fieldName={`assignedVacations[${index}].description`}
                      defaultValue={item?.description}
                      multiline
                      rows={2}
                    />
                  </Flex>
                  <VacationsInitialMigrationForm
                    index={index}
                    vacations={vacations}
                    isInitialMigrationOfVacationYear={
                      isInitialMigrationOfVacationYear
                    }
                    handleIsInitialMigration={handleIsInitialMigration}
                  />
                </FlexColumn>
              );
            }}
          />

          {oldVacations.length > 0 && (
            <>
              {oldVacations.map((vacation, index) => (
                <Fragment key={index}>
                  {Object.entries(vacation).map(([key, value]) => (
                    <FormHiddenInput
                      key={key}
                      fieldName={`hiddenOldVacations[${index}].${key}`}
                      defaultValue={value}
                    />
                  ))}
                </Fragment>
              ))}
            </>
          )}

          <VacationsFormHistoryList assignedVacations={assignedVacations} />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
