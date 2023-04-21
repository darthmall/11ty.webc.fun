---
title: WebC Inside Your Head
description: WebC in the brain, WebC in the membrane!
date: 2023-04-21
---

Page titles usually include multiple pieces of information: the name of the current page and the name of the site.
Except when you’re on the home page, then it usually just displays the site name.
If there is a page title, you’ll want to put that first, and probably include some kind of separator to distinguish it from the site name that follows.
Oi, this is getting complicated.
It sure would be nice to wrap all of this up into a component that we could just drop in our base layout and forget about it.

Wait.
We can‽

Render functions to the rescue!

<figure>

```html
<script webc:type="js" webc:is="template">
	let metaTitle;

	if (title) {
		// If the current page has a title, put it before the site title
		metaTitle = `${title} — ${$data.site.title}`;
	} else {
		// If the current page has no title, just put the site title
		metaTitle = $data.site.title;
	}

	`<title>${metaTitle}</title>`;
</script>
```

<figcaption>meta-title.webc</figcaption>

</figure>

This component gives us a default title if the page hasn’t set a `title` property in frontmatter, and it builds a title from both the page and site titles if the page has a title.
So if we don’t set a title for our home page, it will get just the site title, and everything else will get a combination page title + site title.

In this case, we include the HTML for the `<title>` element in our render function, rather than just returning the plain text title the way we did for our [copyright component](/recipes/generating-dynamic-data/).
The reason is that — strictly speaking — custom elements are not permitted inside `<head>`.
So when WebC’s HTML parser encounters a custom element in the HTML head, it kicks it out into the body.
We have to work around this using [`webc:is`](https://www.11ty.dev/docs/languages/webc/#webcis).

In a nutshell, `webc:is` tells the WebC compiler that despite whatever tag name it sees on this element, it’s really this other element.
So in our `<head>` we’ll write a normal `<title>` element and set `webc:is="meta-title"` to let WebC know that it should replace the title with our custom component.

<figure>

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<title webc:is="meta-title"></title>
	</head>
	<body></body>
</html>
```

<figcaption>base.webc</figcaption>
</figure>

And now every page will get the appropriate title.
