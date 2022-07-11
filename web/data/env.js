module.exports = () => ({
  isDevelopment: process.env.NODE_ENV !== "production",
  ga: process.env.GOOGLE_ANALYTICS_ID,
  transportGA: process.env.GOOGLE_ANALYTICS_TRANSPORT === 'true',
  url: process.env.URL,
  domain: process.env.DOMAIN,
});
