---
title: Outputting a Variable
description: I’ve got 99 problems, but writing out variables in my WebC components ain’t one.
date: 2023-04-21
---

Coming from some of Eleventy’s other template languages, you’re probably used to wrapping your variable names in curly braces.

<figure>

```jinja
{{ title }}
```

<figcaption>Syntax to write the contents of the <code>title</code> variable in a Liquid or Nunjucks template.</figcaption>
</figure>

The equivalent in WebC is a `<template>` with an `@text` property.

<figure>

```html
<template @text="title" webc:nokeep></template>
```

<figcaption>Syntax to write the contents of the <code>title</code> variable in WebC.</figcaption>
</figure>

`@text` is a special property in [WebC for setting the text](https://github.com/11ty/webc#setting-text) of an element from data.
`webc:nokeep` tells WebC to discard the tag once it’s done processing it, so that our variable contents don’t end up wrapped in a `<template>` tag in our final markup.

WebC escapes strings when used with `@text` the same way that Nunjucks escapes strings by default. So if your `title` variable contains the string “1&lt;sup>st&lt;/sup>”, WebC will write out `1&lt;sup&gt;st&lt;/sup&gt;`.

## Writing Unescaped HTML

With Nunjucks, you can use the `safe` filter to prevent the value from being escaped.

<figure>

```jinja
{{ title | safe }}
```

<figcaption>Syntax to write the contents of the <code>title</code> variable in a Nunjucks template without escaping any characters.</figcaption>
</figure>

In WebC we can use either the `@raw` or the `@html` properties.
The `@raw` property is the most similar to `safe`, so let’s begin there.

<figure>

```html
<template @raw="title" webc:nokeep></template>
```

<figcaption>Syntax to write the contents of the <code>title</code> variable in WebC without escaping any characters.</figcaption>
</figure>

Given our previous example of a `title` variable containing the text “1&lt;sup>st&lt;/sup>”, the above template in WebC would preserve the HTML in our output.

### Processing WebC Components in the Output

The other property that passes text through unescaped is `@html`.
The difference between `@raw` and `@html` is that `@html` will run the output through WebC again.
So, if you have a variable that may have WebC components in it, you’ll want to use `@html`, not `@raw`.
Be careful about using `@html` in layout chains, because if you have a WebC component that doesn’t remove its custom element, this element could be reprocessed multiple times as Eleventy works its way up the layout chain.
