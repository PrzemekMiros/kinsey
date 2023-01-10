
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/assets/img");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");

    eleventyConfig.addCollection('realizacje', function(collectionApi) {
      return collectionApi.getFilteredByGlob('src/realizacje/**/*.md').reverse();
    });
  
    return {
      dir: {
        input: "src",
        output: "public",
        includes: "includes"
      },
    };
  };