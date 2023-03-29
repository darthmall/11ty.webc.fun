const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginWebC = require("@11ty/eleventy-plugin-webc");
const postcss = require("postcss");
const atImport = require("postcss-import");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginRSS);
	eleventyConfig.addPlugin(pluginWebC, {
		components: "src/_includes/components/*.webc",
	});

	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function(inputContent) {
			const result = await postcss([atImport]).process(inputContent);

			return async () => result.css;
		},
	});

	eleventyConfig.addCollection("feed", function(collectionApi) {
		return collectionApi.getFilteredByGlob("src/pages/recipes/**/*");
	});

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy({ public: "." });

	return {
		dir: {
			input: "src",
		},
		markdownTemplateEngine: false,
	};
};
