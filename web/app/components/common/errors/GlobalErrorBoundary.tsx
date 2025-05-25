import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ErrorPageLayout, LoaderPage } from "~/components/common";
import { t } from "i18next";
import {
  ErrorPage403Graphic,
  ErrorPage404Graphic,
  ErrorPage500Graphic,
  DefaultErrorGraphic,
  ErrorPage503Graphic,
} from "~/assets";

export function GlobalErrorBoundary() {
  const error = useRouteError();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const errorStatus = null;
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  if (isInitialLoad) {
    return <LoaderPage />;
  }

  if (isRouteErrorResponse(error)) {
    const errorStatus = error.status;
    switch (errorStatus) {
      case 401:
        return (
          <ErrorPageLayout
            title={t("error.genericErrorTitle")}
            subtitle={t("error.genericErrorSubtitle")}
            message={t("error.genericErrorMessage")}
            imgSrc={DefaultErrorGraphic}
          />
        );
      case 403:
        return (
          <ErrorPageLayout
            title={t("error.error403")}
            subtitle={t("error.accessDeniedSubtitle")}
            message={t("error.accessDeniedMessage")}
            imgSrc={ErrorPage403Graphic}
          />
        );
      case 404:
        return (
          <ErrorPageLayout
            title={t("error.notFoundTitle")}
            subtitle={t("error.notFoundSubtitle")}
            message={t("error.notFoundMessage")}
            imgSrc={ErrorPage404Graphic}
          />
        );
      case 500:
        return (
          <ErrorPageLayout
            title={t("error.error500")}
            subtitle={t("error.somethingWrongOnOurEndTitle")}
            message={t("error.somethingWrongOnOurEndMessage")}
            imgSrc={ErrorPage500Graphic}
          />
        );
      case 503:
        return (
          <ErrorPageLayout
            title={t("error.error503")}
            subtitle={t("error.excitingThingsAheadSubtitle")}
            message={t("error.excitingThingsAheadMessage")}
            imgSrc={ErrorPage503Graphic}
          />
        );
      default:
        return (
          <ErrorPageLayout
            title={t("error.genericErrorTitle")}
            subtitle={t("error.genericErrorSubtitle")}
            message={t("error.genericErrorMessage")}
            imgSrc={DefaultErrorGraphic}
          />
        );
    }
  }

  // Don't show the error boundary if the error is a 401, since we redirect to the login page
  if (errorStatus && errorStatus === 401) {
    return null;
  }

  return (
    <ErrorPageLayout
      title={t("error.genericErrorTitle")}
      subtitle={t("error.genericErrorSubtitle")}
      message={t("error.genericErrorMessage")}
      imgSrc={DefaultErrorGraphic}
    />
  );
}
