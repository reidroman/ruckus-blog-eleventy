module.exports = () => {
  return {
    eleventyComputed: {
      permalink: (data) => {
        const pathStem = data.page.filePathStem.replace(/^\/pages/, '');
        const extension = data.page.outputFileExtension;
        return `${pathStem}/index.${extension}`;
      },
    },
    // tags: ["pages"],
  };
};
