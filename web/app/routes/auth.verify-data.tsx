import {
  ClientActionFunctionArgs,
  json,
  useLoaderData,
} from "@remix-run/react";
import { requireAuth } from "~/util";
import { VerifyDataCard } from "~/components/features";

export const clientLoader = async ({ request }: ClientActionFunctionArgs) => {
  requireAuth();
  const { searchParams } = new URL(request.url);

  const workspaceUserName = searchParams.get("workspaceUserName");
  const workspaceUserSurname = searchParams.get("workspaceUserSurname");

  if (workspaceUserName && workspaceUserSurname) {
    return json({ workspaceUserName, workspaceUserSurname });
  }
  return null;
};

export default function VerifyData() {
  const userData = useLoaderData<{
    workspaceUserName: string;
    workspaceUserSurname: string;
  }>();

  return <VerifyDataCard userData={userData} />;
}
