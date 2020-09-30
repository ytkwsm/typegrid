const fs = require('fs');
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const marked = require('marked');
// const html = require('html');
const md = require('markdown-it')({
  html: true
 ,breaks: true
 ,linkify: true
 ,typographer: true
 ,quotes: '“”‘’'
});
 
module.exports = (function(eleventyConfig) {

  //str.substr for meta description
  eleventyConfig.addFilter("strTrim", strOrigin => {
    let result;
    let forSearchAndMetaDesc = 130;
    let maxLength = forSearchAndMetaDesc - 3;
    let ellipsis = "...";
    if(strOrigin.length > forSearchAndMetaDesc) {
      let targetTrim = strOrigin.replace(/\r?\n/g,"").slice( 0, maxLength );
      result = targetTrim + ellipsis;
    } else {
      result = strOrigin.replace(/\r?\n/g,"");
    }
    return result;
  });

  //Date filter for top
  eleventyConfig.addFilter("yearOnly", dateObj => {
    return DateTime.fromISO(dateObj).setLocale('ja').toFormat("yyyy");
  });

  //Date filter for permalink
  eleventyConfig.addFilter("permalinkDate", dateObj => {
    return DateTime.fromISO(dateObj).setLocale('ja').toFormat("yyyy'/'M'/'d''");
  });

  //markdown filter
  eleventyConfig.addFilter('markdown', value => {
    let markdown = require('markdown-it')({
        html: true
    });
    return markdown.render(value);
});
 
  // syntax Highlight
  eleventyConfig.addPlugin(syntaxHighlight);
 
  // 11ty設定
  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src/html",
      includes: "_includes",
      data: "_data",
      output: "dist"
    }
  };
});