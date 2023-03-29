---
title: Dynamically Generating Content
description: Save yourself the trouble of having to update your copyright every year with this one weird trick!
date: 2023-02-28
---

Sure, you _could_ just write the copyright statement in your site footer template the way we did in the [partials recipe](/recipes/webc-partial/), but then, every year, you have to remember to open up that template in a text editor, change the date, commit the change, and deploy a new version of the site.
If you set the year dynamically whenever the site is built based on the current date, then you can just skip to the end and redeploy the website.
No muss, no fuss.

In the old days, we’d use a [shortcode](https://www.11ty.dev/docs/shortcodes/) to render the copyright.
But with WebC, we can use… _render functions_!
We’ll just make a component called `<copyright>` that writes out the copyright information, and use that in our site footer component.

<figure>

```html
<script webc:type="js">
	const now = new Date();

	`&copy; ${now.getFullYear()} Yours Truly.`;
</script>
```

<figcaption>copyright.webc</figcaption>
</figure>

The copyright component gets the current date, and then uses that inside a template literal to write out the current year.
And you can fancy this up a bit by including values from global data, too.
Whatever you need to do.

Notice that our render function doesn’t return any HTML — aside from the copyright HTML entity.
WebC components can return just plain text, they don’t have to return HTML.
Returning just this sentence gives us a lot of flexibility when it comes to using this component.
If our footer puts the copyright notice inside a paragraph, no problem.

<figure>

```html
<footer>
	<p>
		<copyright></copyright> Built with <a href="https://11ty.dev/">11ty</a>.
	</p>
</footer>
```

<figcaption>site-foot.webc</figcaption>
</figure>

We can just drop our copyright element wherever we need it.
