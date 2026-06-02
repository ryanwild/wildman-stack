const config = {
  // these values are hardcoded to prevent any environment variables
  // leaking into client side code
  // TODO: make these values dynamic
  baseURL: "https://wildmanstack.localhost",
  basePath: "/auth",
  fetchOptions: {
    baseURL: "https://wildmanstack.localhost/auth",
  },
  advanced: {
    useSecureCookies: true,
    cookiePrefix: "_wms",
  },
};

export default config;
