export const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const backendBaseUrl =
  environment === "Development"
    ? process.env.NEXT_PUBLIC_SERVER_BASE_URL_DEVELOPEMENT
    : process.env.NEXT_PUBLIC_SERVER_BASE_URL_PRODUCTION;
