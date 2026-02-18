const NODE_ENV = "production";

export const BASE_URL = NODE_ENV
  ? import.meta.env.PROD_VITE_BASE_URL
  : import.meta.env.DEV_VITE_BASE_URL;
