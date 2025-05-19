import { t } from "i18next";

export enum WorkspaceUserGender {
  Male = "Male",
  Female = "Female",
  PreferNotToSay = "PreferNotToSay",
}

export function getWorkspaceGenderLabel(value: WorkspaceUserGender): string {
  return {
    [WorkspaceUserGender.Male]: t("common.male"),
    [WorkspaceUserGender.Female]: t("common.female"),
    [WorkspaceUserGender.PreferNotToSay]: t("common.preferNotToSay"),
  }[value];
}
