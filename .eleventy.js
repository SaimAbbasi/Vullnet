module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addCollection("blog", col =>
    col.getFilteredByTag("blog").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addFilter("readableDate", date =>
    new Date(date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
  );
  eleventyConfig.addFilter("isoDate", date =>
    new Date(date).toISOString().split("T")[0]
  );
  eleventyConfig.addFilter("urlencode", str => encodeURIComponent(str));
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("exclude", (arr, url) => arr.filter(p => p.url !== url));

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
