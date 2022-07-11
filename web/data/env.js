module.exports = () => ({
  isDevelopment: process.env.CONTEXT !== "production",
  ga: process.env.GOOGLE_ANALYTICS_ID,
  transportGA: process.env.GOOGLE_ANALYTICS_TRANSPORT === 'true',
  url: process.env.URL,
  domain: process.env.DOMAIN,
});
