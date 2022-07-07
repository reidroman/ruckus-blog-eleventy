module.exports = {
  sanity: {
    apiVersion:process.env.SANITY_API_VERSION || "2022-07-07",
    projectId: process.env.SANITY_PROJECT_ID || "gkyg7umq",
    dataset: process.env.SANITY_DATASET || "production",
  },
};
