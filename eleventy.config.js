const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginWebC = require("@11ty/eleventy-plugin-webc");
const postcss = require("postcss");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginRSS);
	eleventyConfig.addPlugin(pluginWebC, {
		components: "src/components/**/*.webc",
	});

	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (inputContent) {
			const result = await postcss().process(inputContent);

			return async () => result.css;
		},
	});

	eleventyConfig.addCollection("feed", function (collectionApi) {
		return collectionApi.getFilteredByGlob("src/pages/recipes/**/*");
	});

	// FIXME: The passthrough behavior in the dev server doesn't seem to be
	// working, so for now we'll go back to the copy behavior.
	eleventyConfig.setServerPassthroughCopyBehavior("copy");
	eleventyConfig.addPassthroughCopy({ "public": "." });

	return {
		dir: {
			input: "src/pages",
			includes: "../components",
			layouts: "../layouts",
			data: "../data",
		},
	};
};
