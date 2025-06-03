import "./util/config/i18n";
import {
  ClientLoaderFunctionArgs,
  json,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { CustomTheme } from "~/themes";
import {
  GlobalErrorBoundary,
  Notistack,
  LoaderPage,
} from "~/components/common";
import {
  getWorkspaceUserFromToken,
  LocalStorageService,
  MenuProvider,
} from "./util";
import { IWorkspaceUser } from "./types";
import moment from "moment";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "react-dates/lib/css/_datepicker.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { UserClient } from "./clients";

export type LoaderData = {
  user: IWorkspaceUser;
};

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(customParseFormat);
// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

// eslint-disable-next-line import/no-named-as-default-member
moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

export async function clientLoader(actionArgs: ClientLoaderFunctionArgs) {
  const url = new URL(actionArgs.request.url);
  const token = LocalStorageService.getString("token");

  LocalStorageService.set("currentBaseRoute", url.pathname.split("/")[1]);

  if (!token) {
    return json({
      user: { name: "", surname: "" },
    });
  }

  const userAcc = getWorkspaceUserFromToken(actionArgs);

  const [user] = await Promise.all([
    UserClient.getUserById({
      employeeId: userAcc.id,
    }),
  ]);
  return json({ user });
}

export function shouldRevalidate({
  currentParams,
  nextUrl,
  currentUrl,
  formData,
}: ShouldRevalidateFunctionArgs) {
  const nextHub = nextUrl.pathname.split("/")[1];
  if (currentUrl !== nextUrl) {
    LocalStorageService.set("currentBaseRoute", nextHub);
  }
  return (
    (currentUrl.pathname.includes("email") &&
      !nextUrl.pathname.includes("email")) ||
    (nextUrl.pathname.includes("settings") && formData?.get("name") !== null) ||
    (nextUrl.pathname.includes("employees") &&
      formData?.get("name") !== null &&
      currentParams.employeeId !== undefined)
  );
}

export default function App() {
  const { user } = useLoaderData() as {
    user: { isSupervisor: boolean };
  };

  return (
    <CustomTheme>
      <Notistack>
        <MenuProvider isSupervisor={user.isSupervisor}>
          <Links />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </MenuProvider>
      </Notistack>
    </CustomTheme>
  );
}

export function ErrorBoundary() {
  return (
    <CustomTheme>
      <GlobalErrorBoundary />
      <Scripts />
    </CustomTheme>
  );
}

export function HydrateFallback() {
  return (
    <CustomTheme>
      <LoaderPage />
      <Scripts />
    </CustomTheme>
  );
}
