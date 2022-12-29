let data = {
	"tags": ["recipe"],
	"layout": "plain.webc"
};

if (process.env.ELEVENTY_ENV === "production") {
	data.date = "git Last Modified";
}

module.exports = data;
