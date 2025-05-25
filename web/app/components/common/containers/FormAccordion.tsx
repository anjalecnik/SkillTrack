import { MiniButton, Accordion, IAccordionProps } from "~/components/common";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { FormContext } from "~/util/context/form/FormContext";

interface IFormAccordionProps extends IAccordionProps {
  displaySaveButton?: boolean;
  dataTestId?: string;
}

/** Wraps Accordion with a Form and adds a hidden intent field. */

export const FormAccordion = ({
  displaySaveButton = true,
  dataTestId,
  ...props
}: IFormAccordionProps) => {
  const { t } = useTranslation();
  const {
    openButtons,
    closedButtons,
    disabled,
    onAccordionClick,
    onCancelClick,
    isLoading,
    children,
  } = props;

  const { form, fieldErrors } = useContext(FormContext);
  const isFormErrored = Object.values(fieldErrors).some(
    (error) => error !== null
  );

  return (
    <Accordion
      {...props}
      openButtons={
        openButtons ?? (
          <>
            <MiniButton
              size="extraSmall"
              variant="outlined"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                onAccordionClick();
                onCancelClick && onCancelClick();
              }}
            >
              {t("common.cancel")}
            </MiniButton>
            {displaySaveButton && (
              <MiniButton
                loading={isLoading}
                type="submit"
                size="extraSmall"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                data-testid="accordionSaveBtn"
                disabled={disabled || (form && !form.dirty) || isFormErrored}
              >
                {t("common.save")}
              </MiniButton>
            )}
          </>
        )
      }
      closedButtons={
        closedButtons ?? (
          <>
            <MiniButton
              id="editButton"
              size="extraSmall"
              data-testid={dataTestId}
              variant="outlined"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                onAccordionClick();
                return;
              }}
            >
              {t("common.edit")}
            </MiniButton>
          </>
        )
      }
    >
      {children}
    </Accordion>
  );
};
