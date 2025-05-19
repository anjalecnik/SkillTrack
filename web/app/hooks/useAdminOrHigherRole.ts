import { useParams } from "@remix-run/react";
import { UserRoles } from "~/types";
import { getDecodedToken } from "~/util";

export function useAdminOrHigherRole() {
  const params = useParams();

  const decodedToken = getDecodedToken();
  const userRole = decodedToken.user.role;

  return userRole === UserRoles.Admin || userRole === UserRoles.Owner;
}
