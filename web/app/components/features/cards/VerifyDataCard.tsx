import { CenteredFlexColumn } from "~/components/common";
import { VerifyDataForm } from "~/components/features";

interface IVerifyDataCardProps {
  userData: {
    workspaceUserName: string;
    workspaceUserSurname: string;
  };
}

export function VerifyDataCard({ userData }: IVerifyDataCardProps) {
  return (
    <CenteredFlexColumn
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <VerifyDataForm userData={userData} />
    </CenteredFlexColumn>
  );
}
