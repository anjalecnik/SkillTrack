import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18next from "./util/config/i18next";

async function main() {
  startTransition(() => {
    const rootElement = document.querySelector("#app");
    if (rootElement) {
      hydrateRoot(
        rootElement,
        <I18nextProvider i18n={i18next}>
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </I18nextProvider>
      );
    } else {
      Error("Error");
    }
  });
}

main().catch((error) => console.error(error));
