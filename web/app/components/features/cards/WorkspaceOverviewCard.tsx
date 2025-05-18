import { IWorkspace, WorkspaceAddressType } from "~/types";
import { OverviewCardLayout, Link } from "~/components/common";
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
import { addressFormatter, fullNameFormatter, phoneFormatter } from "~/util";
import { WORKSPACE_HUB_PATH } from "~/constants";

export interface IWorkspaceOverviewCardProps {
  workspace: IWorkspace;
}

export function WorkspaceOverviewCard({
  workspace,
}: IWorkspaceOverviewCardProps) {
  const workspaceAddress = workspace?.addresses?.find(
    ({ type }) => type === WorkspaceAddressType.Main
  );

  return (
    <OverviewCardLayout
      title={<span data-testid="workspaceTitleLabel">{workspace.name}</span>}
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
          value: workspace.email ?? t("common.notPresent"),
        },
      ]}
      centerItems={[
        {
          key: "employees",
          label: t("common.employees"),
          value: (
            <Link
              variant="link"
              to={`${WORKSPACE_HUB_PATH}/${workspace.id}/employees`}
            >
              {workspace.workspaceUsersCount}
            </Link>
          ),
        },
        {
          key: "projects",
          label: t("common.projects"),
          value: (
            <Link
              variant="link"
              to={`${WORKSPACE_HUB_PATH}/${workspace.id}/projects`}
            >
              {workspace.projectsCount}
            </Link>
          ),
        },
      ]}
      rightItems={[
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
          value: addressFormatter(workspaceAddress),
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
          value: phoneFormatter(workspace),
        },
        {
          key: "owner",
          icon: (
            <UserOutlined
              style={{
                color: "#8C8C8C",
                alignSelf: "center",
                fontSize: "18px",
              }}
            />
          ),
          value: fullNameFormatter(workspace.owner),
        },
      ]}
    />
  );
}
