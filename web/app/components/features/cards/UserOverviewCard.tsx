import { OverviewCardLayout, CopyToClipboard } from "~/components/common";
import { EmployeeAddressType, IWorkspaceUser } from "~/types";
import { t } from "i18next";
import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  addressFormatter,
  formatDate,
  fullNameFormatter,
  phoneFormatter,
} from "~/util";

interface IUserOverviewCardProps {
  workspaceUser: IWorkspaceUser;
  footerChildren?: React.ReactNode;
}

export function UserOverviewCard({
  workspaceUser,
  footerChildren,
}: IUserOverviewCardProps) {
  const { birthDate, email, manager } = workspaceUser || {};

  const generateSubtitle = () => {
    if (!workspaceUser) return "";

    const subtitle = [];

    if (workspaceUser.workPosition?.name) {
      subtitle.push(workspaceUser.workPosition.name);
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
