import {
  FormProvider,
  getInputProps,
  SubmissionResult,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import {
  TextInput,
  FormDialog,
  Button,
  PaddedFlexColumn,
} from "~/components/common";
import { IOffice } from "~/types";
import { createOfficeFormSchema, updateOfficeFormSchema } from "~/schemas";
import { Dispatch, SetStateAction } from "react";
import { useNavigationState } from "~/hooks";

interface IOfficeFormProps {
  lastResult?: SubmissionResult<string[]>;
  open: boolean;
  item: IOffice;
  setOfficePopupOpen: Dispatch<SetStateAction<boolean>>;
}

export function OfficeForm({
  lastResult,
  open,
  item,
  setOfficePopupOpen,
}: IOfficeFormProps) {
  const { t } = useTranslation();
  const { isLoading } = useNavigationState();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: z.discriminatedUnion("intent", [
          createOfficeFormSchema,
          updateOfficeFormSchema,
        ]),
      });
    },
    defaultValue: {
      office: JSON.stringify(item),
      name: item?.name,
      address: item?.plan.buildings[0].address,
    },
    shouldValidate: "onSubmit",
  });

  const handleCloseOfficePopup = () => {
    setOfficePopupOpen(false);
  };

  return (
    <FormDialog
      open={open}
      onClose={handleCloseOfficePopup}
      title={
        item
          ? t("workspaceReservations.editOffice")
          : t("workspaceReservations.addOffice")
      }
      formId={form.id}
      footer={
        <>
          <input type="hidden" name="office" value={JSON.stringify(item)} />
          <Button
            variant="outlined"
            onClick={handleCloseOfficePopup}
            type="button"
            disabled={isLoading}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="contained"
            name="intent"
            value={item ? "update" : "create"}
            type="submit"
            loading={isLoading}
          >
            {t("common.save")}
          </Button>
        </>
      }
    >
      <FormProvider context={form.context}>
        <PaddedFlexColumn>
          <TextInput
            {...getInputProps(fields.name, { type: "text" })}
            label={t("workspaceReservations.office")}
            required
            placeholder={t("workspaceReservations.officeNamePlaceholder")!}
            defaultValue={item?.name ?? ""}
          />
          <TextInput
            {...getInputProps(fields.address, { type: "text" })}
            label={t("workspaceReservations.address")}
            required
            placeholder={t("workspaceReservations.addressPlaceholder")!}
            defaultValue={item?.plan.buildings[0].address ?? ""}
          />
        </PaddedFlexColumn>
      </FormProvider>
    </FormDialog>
  );
}
