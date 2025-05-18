import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import * as i18nConfig from "~/util/config/i18n";

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    ...i18nConfig,
    detection: { order: ["htmlTag"], caches: [] },
  });

export default i18next;
