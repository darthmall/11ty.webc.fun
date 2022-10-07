---
title: Dynamically Generating Content
description: Save yourself the trouble of having to update your copyright every with this one weird trick!
---

Chances are there are at least two things on your website that you’ll want to generate dynamically:

1. The copyright in your footer
2. The `<title>` attribute for each page

## Copyright notices

Sure, you _could_ just write the copyright statement in your site footer template the way we did in the [partials recipe](/recipes/webc-partial/), but then, every year, you have to remember to open up that template in a text editor, change the date, commit the change, and deploy a new version of the site.
If you set the year dynamically whenever the site is built based on the current date, then you can just skip to the end and redeploy the website.
No muss, no fuss.

In the old days, we’d use a [shortcode](https://www.11ty.dev/docs/shortcodes/) to render the copyright.
But with WebC, we can use… _render functions_!
We’ll just make a component called `<copyright>` that writes out the copyright information, and use that in our site footer component.

<figure>

```html
<script webc:type="render" webc:is="template">
  function() {
    const now = new Date();

    return `&copy; ${now.getFullYear()} Yours Truly.`;
  }
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

## Page titles

Page titles usually include multiple pieces of information: the name of the current page and the name of the site.
Except when you’re on the home page, then it usually just displays the site name.
If there is a page title, you’ll want to put that first, and probably include some kind of separator to distinguish it from the site name that follows.

We can accomplish this once again through the magic of render functions.

<figure>

```html
<script webc:type="render" webc:is="template">
  function () {
    let title;

    if (this.title) {
      // If the current page has a title, put it before the site title
      title = `${this.title} — ${this.site.title}`;
    } else {
      // If the current page has no title, just put the site title
      title = this.site.title;
    }

    return `<title>${title}</title>`;
  }
</script>
```

<figcaption>meta-title.webc</figcaption>

</figure>

This component gives us a default title if the page hasn’t set a `title` property in frontmatter, and it builds a title from both the page and site titles if the page has a title.
So if we don’t set a title for our home page, it will get just the site title, and everything else will get a combination page title + site title.

In this case, we did include the HTML for the `<title>` element in our render function, rather than just returning the plain text title.
The reason is that — strictly speaking — custom elements are not permitted inside `<head>`.
So when WebC’s HTML parser encounters a custom element in the HTML head, it kicks it out into the body.
We have to work around this using [`webc:is`](https://www.11ty.dev/docs/languages/webc/#webcis).

In a nutshell, `webc:is` tells the WebC compiler that despite whatever tag name it sees on this element, it’s really this other element.
So in our `<head>` we’ll write a normal `<title>` element and set `webc:is="meta-title"` to let WebC know that it should replace the title with our custom component.

<figure>

```html
<!doctype html>
<html lang="en">
  <head>
    <title webc:is="meta-title"></title>
  </head>
  <body>
  </body>
</html>
```

<figcaption>base.webc</figcaption>
</figure>

And now every page will get the appropriate title.
