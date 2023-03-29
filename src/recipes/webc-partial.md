---
title: Partials with WebC
description: Package up common snippets of HTML inside of WebC for fun and profit!
date: 2022-10-06
---

Partials — or snippets — are the simplest form of code reuse.
They require no parameterization.
You simply plop them down somewhere in your markup and they get replaced by a different block of code.
They may be completely static, or rely only on some globally available context.

Partials in WebC are trivially easy.

<figure>

```html
<footer>
	<p>&copy; 2022 Yours Truly.</p>
</footer>
```

<figcaption>site-footer.webc</figcaption>

</figure>

With the above <samp>.webc</samp> file, we can simply plop down `<site-footer></site-footer>` anywhere in our markup and when the WebC compiler encounters that tag, it will replace it with our footer markup.
Easy peasy.

This even works for SVG icons.
Download the SVG, copy it into wherever WebC expects to find components, and replace the <samp>.svg</samp> extension with <samp>.webc</samp>.
Then you can use a custom element tag anywhere in your markup, and WebC will replace it with the contents of that SVG.
