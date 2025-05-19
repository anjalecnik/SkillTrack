import { Fragment } from "react";
import { FormHiddenInput } from "~/components/common";
import { AssignedVacations } from "~/types";

interface IVacationsHiddenInputsFormProps {
  vacation: AssignedVacations & {
    oldVacationExpiration: string;
    description: string;
  };
  index: number;
}

export function VacationsHiddenInputsForm({
  vacation,
  index,
}: IVacationsHiddenInputsFormProps) {
  return (
    <Fragment key={index}>
      <FormHiddenInput
        fieldName={`assignedVacations[${index}].id`}
        defaultValue={vacation.id}
      />
    </Fragment>
  );
}
