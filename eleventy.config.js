const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebC, {
		components: "src/components/**/*.webc",
	});

	return {
		dir: {
			input: "src/pages",
			includes: "../components",
			layouts: "../layouts",
			data: "../data",
		},
	};
};
