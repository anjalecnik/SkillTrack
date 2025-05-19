import dayjs from "dayjs";
import {
  Children,
  isValidElement,
  JSXElementConstructor,
  ReactElement,
} from "react";
import {
  IActivityByIdResponse,
  IDailyTimeSpan,
  WorkingHoursType,
} from "~/types";

type ComponentWithDisplayName = JSXElementConstructor<unknown> & {
  displayName?: string;
};

const isComponentWithDisplayName = (
  type: unknown
): type is ComponentWithDisplayName =>
  typeof type === "function" && "displayName" in type;

export const recursiveMapChildren = (
  children: ReactElement | ReactElement[],
  fn: (child: ReactElement) => ReactElement | undefined
): ReactElement[] => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if ((child as ReactElement).props.children) {
      recursiveMapChildren((child as ReactElement).props.children, fn);
    }
    return fn(child);
  });
};

export const getDefaultFormInputValues = (
  children: ReactElement | ReactElement[]
): Record<string, string | string[]> => {
  const defaultValues: Record<string, string | string[]> = {};
  recursiveMapChildren(children, (child) => {
    const {
      fieldName,
      defaultValue,
      countryCodeFieldName,
      numberFieldName,
      countryCodeDefaultValue,
      numberDefaultValue,
      format,
    } = child.props;

    const fieldType =
      typeof child.type !== "string" && isComponentWithDisplayName(child.type)
        ? child.type.displayName
        : null;

    if (
      fieldType === "FormPhoneNumberInput" &&
      numberDefaultValue &&
      numberFieldName &&
      countryCodeDefaultValue &&
      countryCodeFieldName
    ) {
      defaultValues[numberFieldName as string] = numberDefaultValue;
      defaultValues[countryCodeFieldName as string] = countryCodeDefaultValue;
    }

    if (!defaultValue || !fieldName) {
      return;
    }
    switch (fieldType) {
      case "FormTimeSelect":
      case "FormDateInput": {
        if (dayjs(defaultValue, format).isValid()) {
          defaultValues[fieldName] = dayjs(defaultValue).format(format);
        }
        break;
      }

      case "FormAutocompleteInput": {
        defaultValues[fieldName] = defaultValue.id;
        break;
      }

      case "FormArray": {
        try {
          if (Array.isArray(JSON.parse(defaultValue))) {
            const arr = JSON.parse(defaultValue) as string[];
            if (arr.length > 0) {
              defaultValues[fieldName] = arr;
            }
          } else {
            throw Error;
          }
        } catch {
          defaultValues[fieldName] = defaultValue;
        }
        break;
      }

      default: {
        defaultValues[fieldName] = defaultValue;
        break;
      }
    }

    return child;
  });
  return defaultValues;
};

export const hasAnyRequiredValues = (
  formValues: { [x: string]: string | undefined },
  requiredFields: Array<string>
) => {
  const filteredFormValues = Object.keys(formValues)
    .filter((key) => requiredFields.includes(key))
    .reduce((obj: { [x: string]: string | undefined }, key) => {
      obj[key] = formValues[key];
      return obj;
    }, {});

  return Object.values(filteredFormValues).some((value) => !!value);
};

export const getWorkingTimeInitialValue = (
  latestActivity: IActivityByIdResponse | null
): IDailyTimeSpan[] | undefined => {
  const generatedWorkingHours: IDailyTimeSpan[] = [];

  if (latestActivity?._embedded?.workingHours.length) {
    const workingHours = latestActivity._embedded.workingHours;
    const hasWork = workingHours.some(
      (time) => time.type === WorkingHoursType.Work
    );

    if (hasWork) {
      workingHours.forEach((time) => {
        if (time.type === WorkingHoursType.Work) {
          generatedWorkingHours.push({
            timeRange: {
              fromTimeStart: time.fromDateStart?.time || "",
              toTimeEnd: time.toDateEnd?.time || "",
            },
            projectId: time.projectId,
          });
        }
      });
    }
  } else {
    generatedWorkingHours.push({
      timeRange: {
        fromTimeStart: "",
        toTimeEnd: "",
      },
      projectId: undefined,
    });
  }
  return generatedWorkingHours;
};
