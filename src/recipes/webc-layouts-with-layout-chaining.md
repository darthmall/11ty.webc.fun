---
title: WebC Layouts with Layout Chaining
description: How to create and reuse WebC layouts for your site.
date: 2023-04-21
---

WebC can be used for [layouts](https://www.11ty.dev/docs/layouts/) in your Eleventy site.
You simply write your HTML and then add `@raw="content"` to whatever element you want to contain the page content.

<figure>

```html
<!DOCTYPE html>
<html>
	<head>
		...
	</head>
	<body @raw="content"></body>
</html>
```

<figcaption>layout.webc</figcaption>
</figure>

You use WebC layouts the same way you use any layout in Eleventy: by setting `layout` in a template’s frontmatter.

<figure>

```md
---
layout: layout.webc
---

# Heading

Lorem ipsum…
```

<figcaption>index.md</figcaption>
</figure>

When Eleventy builds your site, it will process <samp>index.md</samp> in the usual fashion.
First, it processes the frontmatter.
Then it processes the Markdown into HTML.
Then it passes all of that as data to the layout it found in your frontmatter.
The HTML generated from the Markdown is provided to the layout in the `content` variable, which, in WebC, is available on `content`.

This is the result:

<figure>

```html
<!DOCTYPE html>
<html>
	<head>
		...
	</head>
	<body>
		<h1>Heading</h1>
		<p>Lorem ipsum…</p>
	</body>
</html>
```

<figcaption>index.html</figcaption>
</figure>

## Layout Chaining

You can also use [layout chaining](https://www.11ty.dev/docs/layout-chaining/) with WebC Layouts.
In fact, since WebC doesn’t really have template inheritance like Nunjucks and Liquid do, this may be the simplest way to reuse layouts and boilerplate.

<figure>

```html
<!DOCTYPE html>
<html>
	<head>
		...
	</head>
	<body @raw="content"></body>
</html>
```

<figcaption>root.webc</figcaption>
</figure>

<figure>

```html
---
layout: root.webc
---

<header>...</header>
<main @raw="content"></main>
<footer>...</footer>
```

<figcaption>main.webc</figcaption>
</figure>

In the above example, we create a template — <samp>root.webc</samp> — that contains all of our HTML boilerplate: doctype, metadata, <i>etc.</i>
Then we create a template — <samp>main.webc</samp> — that provides the scaffolding for our site: the site header, a main section, and the site footer.
<samp>main.webc</samp> uses <samp>root.webc</samp> as its layout so that it will get wrapped inside of the `<body>` tag with all the necessary boilerplate around it.

If we then use <samp>main.webc</samp> as a layout for a Markdown template, we’ll get the whole kit-n-caboodle in our final HTML.

<figure>

```md
---
layout: main.webc
---

# Heading

Lorem ipsum…
```

<figcaption>index.md</figcaption>
</figure>

The final result of combining <samp>index.md</samp>, <samp>main.webc</samp>, and <samp>root.webc</samp> looks like this:

<figure>

```html
<!DOCTYPE html>
<html>
	<head>
		...
	</head>
	<body>
		<header>...</header>
		<main>
			<h1>Heading</h1>
			<p>Lorem ipsum…</p>
		</main>
		<footer>...</footer>
	</body>
</html>
```

<figcaption>index.html</figcaption>
</figure>
