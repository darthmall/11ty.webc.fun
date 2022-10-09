---
title: Outputting a Variable
description: I’ve got 99 problems, but writing out variables in my WebC components ain’t one.
---

Coming from some of Eleventy’s other template languages, you’re probably used to wrapping your variable names in curly braces.

<figure>

```jinja
{{ title }}
```

<figcaption>Syntax to write the contents of the <code>title</code> variable in a Liquid or Nunjucks template.</figcaption>
</figure>

The equivalent in WebC is a `<template>` with an `@html` property.

<figure>

```html
<template @html="this.title" webc:nokeep></template>
```

<figcaption>Syntax to write the contents of the <code>title</code> variable in WebC.</figcaption>
</figure>

`@html` is a special property in [WebC for setting the inner HTML](https://github.com/11ty/webc#setting-html) of an element from data.
All of the data from the [data cascade](https://www.11ty.dev/docs/data-cascade/) — or data that you provide to the component — is available on `this`.
`webc:nokeep` tells WebC to discard the tag once it’s done processing it, so that our variable contents don’t end up wrapped in a `<template>` tag in our final markup.

## Escape your own HTML

Other template engines like Nunjucks automatically escape your HTML for you.
This means if you have a variable containing the string <q>&lt;strong&gt;Hi!&lt;/strong&gt;</q>, Nunjucks will replace the <q>&lt;</q> and <q>&gt;</q> with `&lt;` and `&gt;` so that the string is not interpreted as HTML when it’s rendered in a browser.
If you want to tell Nunjucks _not_ to escape the HTML, you use the `safe` filter.
You’re probably familiar with this from your layout templates where you have to write `{{ content | safe }}` so that the processed Markdown from your page templates is interpreted as HTML in the final output.

WebC does _not_ escape your variables automatically.
Passing a string of HTML to the `@html` property will render as HTML in the final output.
This means you don’t have to mark variables as <q>safe</q> if they contain markup, but it means if you have markup you want displayed on the page verbatim, you’ll need to escape it yourself first.

If you’re using backticks (<code>`</code>) in your Markdown, you don’t have to escape anything.
Markdown escapes it for you before it gets to your layout templates.
