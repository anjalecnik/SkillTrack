import { redirect } from "@remix-run/node";
import { AuthClient } from "~/clients";

export const clientLoader = async () => {
  AuthClient.clearStorage();
  return redirect("/");
};
