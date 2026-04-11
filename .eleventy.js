module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addCollection("blog", col =>
    col.getFilteredByTag("blog").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addFilter("readableDate", date =>
    new Date(date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
  );
  eleventyConfig.addFilter("isoDate", date =>
    new Date(date).toISOString().split("T")[0]
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk"
  };
};
