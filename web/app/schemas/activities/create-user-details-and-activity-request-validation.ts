import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import {
  addressFormSchema,
  employmentFormSchema,
  personalSettingsFormSchema,
  projectAssignFormSchema,
  vacationsAssignFormSchema,
  workPositionFormSchema,
  planAbsenceFormSchema,
  overtimeFormDialogSchema,
  businessTripFormDialogSchema,
  onCallFormDialogSchema,
  expensesFormDialogSchema,
  requestUpdateSchema,
  deleteSchema,
  PlanAbsenceSubmissionType,
  BusinessTripSubmissionType,
  onCallSubmissionType,
  employeeStatusFormSchema,
  tripToOfficeFormDialogSchema,
} from "~/schemas";
import { ActivityFormDialogs as Dialogs } from "~/types";
import {
  isEndDateGreaterOrEqualToStartDate,
  isStartTimeBeforeEndTimeWithDate,
} from "~/util";

export const createUserDetailsAndActivityRequestValidation = (
  formData: FormData
) => {
  return parseWithZod(formData, {
    schema: z
      .discriminatedUnion("intent", [
        personalSettingsFormSchema,
        workPositionFormSchema,
        employmentFormSchema,
        projectAssignFormSchema,
        vacationsAssignFormSchema,
        addressFormSchema,
        planAbsenceFormSchema,
        overtimeFormDialogSchema,
        businessTripFormDialogSchema,
        onCallFormDialogSchema,
        expensesFormDialogSchema,
        requestUpdateSchema,
        deleteSchema,
        employeeStatusFormSchema,
        tripToOfficeFormDialogSchema,
      ])
      .refine(
        (data) => {
          switch (data.intent) {
            case Dialogs.PlanAbsence: {
              const { dateStart, dateEnd } = data as PlanAbsenceSubmissionType;
              return isEndDateGreaterOrEqualToStartDate(
                dateStart,
                dateEnd,
                "DD.MM.YYYY"
              );
            }

            case Dialogs.BusinessTrip: {
              const { dateStart, dateEnd, departureTime, returnTime } =
                data as BusinessTripSubmissionType;
              return isStartTimeBeforeEndTimeWithDate(
                dateStart,
                dateEnd,
                departureTime,
                returnTime,
                "DD.MM.YYYY HH:mm"
              );
            }
            case Dialogs.OnCall: {
              const { dateStart, dateEnd, startTime, endTime } =
                data as onCallSubmissionType;
              return isStartTimeBeforeEndTimeWithDate(
                dateStart,
                dateEnd,
                startTime,
                endTime,
                "DD.MM.YYYY HH:mm"
              );
            }
            default:
              return true;
          }
        },
        { message: "error.endDateBeforeStartDate", path: ["dateEnd"] }
      ),
  });
};
