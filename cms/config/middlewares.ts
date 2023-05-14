export default [
  "strapi::errors",
  "strapi::security",
  "strapi::poweredBy",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      methods: ["GET", "POST", "OPTIONS"],
      headers: "*",
      origin: [
        "http://localhost:5173",
        "http://localhost:1337",
        "https://optom-resources-client.page.dev",
      ],
    },
  },
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
