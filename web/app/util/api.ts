import * as Axios from "axios";
import { isAxiosError } from "axios";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { AuthClient } from "~/clients";
import {
  ADMIN_HUB_BASE_PATH,
  ADMIN_WORKSPACE_URL,
  USER_HUB_BASE_PATH,
  USER_WORKSPACE_URL,
} from "~/constants";

let isRefreshing = false;
let refreshSubscribers: { (): void }[] = [];

// Function to subscribe to token refresh
const subscribeTokenRefresh = (callBack: () => void) => {
  refreshSubscribers.push(callBack);
};

// Function to call all subscribers once token is refreshed
const onRefreshed = () => {
  refreshSubscribers.map((callBack) => callBack());
};

const publicClient = Axios.default.create({
  headers: {
    "Content-type": "application/json",
  },
});

const updateTokens = (response: Axios.AxiosResponse) => {
  const { accessToken, refreshToken } = response.data;

  if (accessToken) {
    localStorage.setItem("token", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

const responseInterceptor = (response: Axios.AxiosResponse) => {
  updateTokens(response);
  return response;
};

publicClient.interceptors.response.use(responseInterceptor);

const privateClient = Axios.default.create({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${
      typeof window !== "undefined" && localStorage.getItem("token")
    }`,
  },
});

const formDataClient = Axios.default.create({
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ${
      typeof window !== "undefined" && localStorage.getItem("token")
    }`,
  },
});

const privateClientRequestInterceptor = (
  config: Axios.InternalAxiosRequestConfig
) => {
  if (typeof window !== "undefined") {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    const currentBaseRoute =
      localStorage.getItem("currentBaseRoute") ?? USER_HUB_BASE_PATH;
    const endpointSegments = config.url?.split("workspaces");

    if (config.url?.startsWith("/overview")) {
      const currentBaseRoute =
        localStorage.getItem("currentBaseRoute") ?? USER_HUB_BASE_PATH;

      config.url =
        currentBaseRoute === ADMIN_HUB_BASE_PATH
          ? `${ADMIN_WORKSPACE_URL}${config.url}`
          : `${USER_WORKSPACE_URL}${config.url}`;

      return config;
    }

    switch (currentBaseRoute) {
      case USER_HUB_BASE_PATH:
        config.url = `${USER_WORKSPACE_URL}${endpointSegments?.pop()}`;
        break;
      case ADMIN_HUB_BASE_PATH:
        config.url = `${ADMIN_WORKSPACE_URL}${endpointSegments?.pop()}`;
        break;
      default:
        break;
    }
  }

  return config;
};

const privateClientErrorInterceptor = async (error: Axios.AxiosError) => {
  const { response, config } = error;

  switch (response?.status) {
    case 401:
      if (config) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh(() => {
              resolve(refreshClient.request(config));
            });
          });
        }

        isRefreshing = true;
        try {
          await AuthClient.refreshToken();
          onRefreshed();
          return refreshClient.request(config);
        } catch (error) {
          if (
            isAxiosError(error) &&
            (response?.status === 401 || response?.status === 400)
          ) {
            AuthClient.clearStorage();
            window.location.replace("/");
          }
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
          refreshSubscribers = [];
        }
      }

      break;
    default:
      break;
  }

  return Promise.reject(error);
};

privateClient.interceptors.response.use(
  responseInterceptor,
  privateClientErrorInterceptor
);
privateClient.interceptors.request.use(privateClientRequestInterceptor);
formDataClient.interceptors.request.use(privateClientRequestInterceptor);

// needed a new client without the error interceptor so we can catch the error
const refreshClient = Axios.default.create({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${
      typeof window !== "undefined" && localStorage.getItem("token")
    }`,
  },
});

const refreshClientRequestInterceptor = (
  config: Axios.InternalAxiosRequestConfig
) => {
  if (typeof window !== "undefined") {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
};

refreshClient.interceptors.response.use(responseInterceptor);
refreshClient.interceptors.request.use(refreshClientRequestInterceptor);

export function handleAxiosError(error: unknown, delay = 50): null {
  if (!isAxiosError(error)) {
    return null;
  }

  const message = Array.isArray(error.response?.data.response)
    ? error.response?.data.response[0]
    : Array.isArray(error.response?.data.message)
    ? error.response?.data.message[0]
    : error.response?.data.message ?? t("error.somethingWentWrong");

  // When there is an API error on page load, the snackbar is undefined, because remix fetches the data before the page is loaded.
  setTimeout(() => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  }, delay);
  return null;
}

export { publicClient, privateClient, refreshClient, formDataClient };
