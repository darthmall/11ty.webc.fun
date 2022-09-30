const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebC, {
		components: "src/components/**/*.webc",
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
