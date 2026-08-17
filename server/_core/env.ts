export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  siteAccessPassword: process.env.SITE_ACCESS_PASSWORD ?? "",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  ndaWebhookUrl: process.env.NDA_WEBHOOK_URL ?? "",
  // Mailversand über Brevo (ersetzt SMTP)
  brevoApiKey: process.env.BREVO_API_KEY ?? "",
  mailFrom: process.env.MAIL_FROM ?? "",
  mailFromName: process.env.MAIL_FROM_NAME ?? "CME Kontaktformular",
  contactEmail: process.env.CONTACT_EMAIL ?? "",
};
