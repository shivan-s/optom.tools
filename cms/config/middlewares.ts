export default ({ env }) => {
  [
    "strapi::errors",
    "strapi::security",
    "strapi::poweredBy",
    {
      name: "strapi::cors",
      config: {
        enabled: true,
        methods: ["GET", "POST", "OPTIONS"],
        headers: "*",
        origin: env("CORS_WHITELIST").split(","),
      },
    },
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
