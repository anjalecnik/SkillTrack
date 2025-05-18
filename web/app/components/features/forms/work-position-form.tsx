import {
  FormId,
  getInputProps,
  getSelectProps,
  useFormMetadata,
} from "@conform-to/react";
import { useTranslation } from "react-i18next";
import { FlexColumn , TextInput, Autocomplete } from "~/components/common";
import { WorkPositionLevel, IPositionResponse } from "~/types";

interface IWorkPositionFormProps {
  selectedItem: IPositionResponse | null;
  formId: FormId;
  workPositions: IPositionResponse[];
}

export function WorkPositionForm({
  selectedItem,
  formId,
  workPositions,
}: IWorkPositionFormProps) {
  const { t } = useTranslation();
  const form = useFormMetadata(formId);

  const fields = form.getFieldset();

  workPositions = workPositions.filter(
    (position) => position.id !== selectedItem?.id
  );

  return (
    <FlexColumn gap={"20px"} padding={"20px"}>
      <input type="hidden" name="id" value={fields.id.value as number} />
      <TextInput
        {...getInputProps(fields.name, { type: "text" })}
        key={fields.name.key}
        label={t("common.name")}
        placeholder={t("common.name")!}
        required
      />
      <Autocomplete
        {...getSelectProps(fields.level)}
        key={fields.level.key}
        name={fields.level.name}
        required
        label={t("workspacePositions.level")!}
        options={Object.entries(WorkPositionLevel).map(([key, val]) => ({
          id: key,
          value: val,
        }))}
        value={
          selectedItem
            ? { id: selectedItem.level, value: selectedItem.level }
            : undefined
        }
        getOptionLabel={(option) => option?.value ?? ""}
      />

      <Autocomplete
        {...getSelectProps(fields.workPositionPromotionId)}
        key={fields.workPositionPromotionId.key}
        name={fields.workPositionPromotionId.name}
        label={t("workspacePositions.promotionPosition")}
        options={workPositions}
        value={workPositions.find(
          (p) => p.id === fields.workPositionPromotionId.value
        )}
        getOptionLabel={(option) => option?.name ?? ""}
      />
      <TextInput
        {...getInputProps(fields.description, { type: "text" })}
        key={fields.description.key}
        label={t("workspacePositions.description")}
        containerProps={{ sx: { flex: 1 } }}
        placeholder={t("workspacePositions.description")!}
        required
        multiline
        minRows={3}
      />
    </FlexColumn>
  );
}
