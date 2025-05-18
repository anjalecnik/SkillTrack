import { OverviewCardLayout, CopyToClipboard } from "~/components/common";
import { EmployeeAddressType, IWorkspaceUser } from "~/types";
import { t } from "i18next";
import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  NumberOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  addressFormatter,
  formatDate,
  fullNameFormatter,
  phoneFormatter,
  vacationDaysFormatter,
} from "~/util";

interface IUserOverviewCardProps {
  workspaceUser: IWorkspaceUser;
  footerChildren?: React.ReactNode;
}

export function UserOverviewCard({
  workspaceUser,
  footerChildren,
}: IUserOverviewCardProps) {
  const { activityStatistic, birthDate, email, manager } = workspaceUser || {};

  const sickDays =
    activityStatistic?.sickLeave?.countDays ||
    activityStatistic?.sickLeave?.countDays == 0
      ? `${activityStatistic.sickLeave.countDays} ${t("common.days")}`
      : t("error.notPresent");

  // const vacations = {
  //   oldVacationDays: activityStatistic?.vacation.old.availableDays,
  //   newVacationDays: vacationDaysFormatter(
  //     activityStatistic?.vacation.new.usedDays,
  //     activityStatistic?.vacation.new.assignedDays
  //   ),
  //   upcoming:
  //     activityStatistic.vacation.upcoming ||
  //     activityStatistic.vacation.upcoming === 0
  //       ? `${activityStatistic.vacation.upcoming} ${t("common.days")}`
  //       : t("error.notPresent"),
  // };

  const generateSubtitle = () => {
    if (!workspaceUser) return "";

    const subtitle = [];

    if (workspaceUser.workspaceWorkPosition?.name) {
      subtitle.push(workspaceUser.workspaceWorkPosition.name);
    }
    let userAddress = workspaceUser?.addresses?.find(
      ({ type }) => type === EmployeeAddressType.Temporary
    );

    if (!userAddress) {
      userAddress = workspaceUser?.addresses?.find(
        ({ type }) => type === EmployeeAddressType.Main
      );
    }

    return (
      <OverviewCardLayout
        title={fullNameFormatter(workspaceUser)}
        subtitle={generateSubtitle()}
        leftItems={[
          {
            key: "mail",
            icon: (
              <MailOutlined
                style={{
                  color: "#8C8C8C",
                  alignSelf: "center",
                  fontSize: "18px",
                }}
              />
            ),
            value: email ?? t("error.notPresent"),
          },
          {
            key: "phone",
            icon: (
              <PhoneOutlined
                style={{
                  color: "#8C8C8C",
                  alignSelf: "center",
                  fontSize: "18px",
                }}
              />
            ),
            value:
              workspaceUser.phone && workspaceUser.countryPhoneCode ? (
                <CopyToClipboard title="Click to copy" plainText>
                  {phoneFormatter({
                    phone: workspaceUser.phone,
                    countryPhoneCode: workspaceUser.countryPhoneCode,
                  })}
                </CopyToClipboard>
              ) : (
                t("error.notPresent")
              ),
          },
        ]}
        image={{
          firstInitialFullValue: workspaceUser.name,
          secondInitialFullValue: workspaceUser.surname,
          id: workspaceUser.id,
        }}
        // centerItems={[
        //   {
        //     key: "oldVacation",
        //     label: t("common.oldVacation"),
        //     value: vacations.oldVacationDays,
        //     tooltip: t("common.oldVacationTooltip"),
        //   },
        //   {
        //     key: "newVacation",
        //     label: t("common.newVacation"),
        //     value: vacations.newVacationDays,
        //     tooltip: t("common.newVacationTooltip"),
        //   },
        //   {
        //     key: "upcomingVacation",
        //     label: t("common.upcomingVacation"),
        //     value: vacations.upcoming,
        //     tooltip: t("common.upcomingVacationTooltip"),
        //   },
        //   {
        //     key: "sick",
        //     label: t("common.sick"),
        //     value: sickDays,
        //     tooltip: t("common.sickLeaveTooltip"),
        //   },
        // ]}
        rightItems={[
          {
            key: "birthday",
            icon: (
              <CalendarOutlined
                style={{
                  color: "#8C8C8C",
                  alignSelf: "center",
                  fontSize: "18px",
                }}
              />
            ),
            value:
              formatDate(birthDate, undefined, "DD/MM/YYYY") ??
              t("error.notPresent"),
          },
          {
            key: "address",
            icon: (
              <HomeOutlined
                style={{
                  color: "#8C8C8C",
                  alignSelf: "center",
                  fontSize: "18px",
                }}
              />
            ),
            value: workspaceUser.addresses?.length ? (
              <CopyToClipboard title={t("common.clickToCopy")} plainText>
                {addressFormatter(userAddress)}
              </CopyToClipboard>
            ) : (
              t("error.notPresent")
            ),
          },
          {
            key: "emergencyContact",
            icon: (
              <UserOutlined
                style={{
                  color: "#8C8C8C",
                  alignSelf: "center",
                  fontSize: "18px",
                }}
              />
            ),
            value: fullNameFormatter(manager),
          },
        ]}
        footerChildren={footerChildren}
      />
    );
  };
}
