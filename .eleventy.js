const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/assets/img");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");

    eleventyConfig.addCollection('realizacje', function(collectionApi) {
      return collectionApi.getFilteredByGlob('src/realizacje/**/*.md').reverse();
    });


  // Prev post
  eleventyConfig.addShortcode('previous', (collections, [tag], {inputPath}) => {
    const collec = collections[tag];
  
    for (let i = 0; i <= collec.length; i++) {
      if (collec[i+1] && collec[i+1].data.page.inputPath === inputPath) {
        return `<a href="${ collec[i].data.page.url }">Poprzedni</a>`;
      }
    }
  });
  
  // Next post
  eleventyConfig.addShortcode('next', (collections, [tag], {inputPath}) => {
    const collec = collections[tag];
  
    for (let i = 1; i <= collec.length-1; i++) {
      if (collec[i-1] && collec[i-1].data.page.inputPath === inputPath) {
        return `<a href="${ collec[i].data.page.url }">Kolejny</a>`;
      }
    }
  });


  // Date

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
        zone: "Europe/Amsterdam",
    }).setLocale('pl').toISODate();
});

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addFilter('dateDisplay', require('./src/filters/date-display.js'));
  
  
    return {
      dir: {
        input: "src",
        output: "public",
        includes: "includes"
      },
    };
  };