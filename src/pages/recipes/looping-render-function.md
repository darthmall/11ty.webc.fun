---
title: Looping with Render Functions
description: Use loops! Save your wrists!
---

Unless you really like copying and pasting, you’re probably going to want to write some loops in your HTML templates.
Coming from template languages like Liquid or Nunjucks, you’ll probably start looking for a `for` keyword, but WebC doesn’t have anything like that — at least, [not yet](https://github.com/11ty/webc/issues/28).
Instead, you’ll want to write a [render function](https://github.com/11ty/webc#javascript-render-functions).

A render function is just a `<script>` tag with some special WebC attributes.
Inside the script tag is a function that returns a string.
That function gets executed and that string gets written into your markup.

For simple loops, the syntax feels a bit cumbersome.
But since you are writing JavaScript, you can do much, much more with it than the looping constructs available to you in Liquid or Nunjucks.

Let’s start simple.

<figure>

```html
<ul>
  <script webc:type="render" webc:is="template">
    function () {
      return this.collections.all
        .map((page) => `<li>
            <a href="${page.url}>${page.data.title}</a>
          </li>`)
        .join("");
    }
  </script>
</ul>
```

	<figcaption>Listing all pages in your collections</figcaption>
</figure>

For this site, I created a custom component — <samp>collection-list.webc</samp> — that renders links to pages from a collection.
You pass it a tag name, and an optional limit, and it produces `<article>` tags for each page in the collection.

<figure>

```html
<script webc:type="render" webc:is="template">
  function () {
    let collection = this.collections[this.tag];

    if (this.limit) collection = collection.slice(0, this.limit);

    return collection.map((page) => `<article>
        <a href="${page.url}">${page.data.title}</a>
        <p>${page.data.description}</p>
      </article>`)
      .join("");
  }
</script>
```

	<figcaption>collection-list.webc</figcaption>
</figure>

This component is then used on the home page to render links out to all of the techniques listed here on the site.

<figure>

```html
<h2>Techniques</h2>
<collection-list @tag="technique"></collection-list>
```

<figcaption>home.webc</figcaption>
</figure>

So you can either just plop the render function down where you need it for an ad hoc loop, or you can wrap it up in a component that you can just drop in where you need it.
