---
title: Remove Custom Elements From Your Output
description: Consider each custom element in your markup and ask yourself, “does this element spark joy?”
date: 2023-03-12
---

When you create a component with WebC that includes at least one `<script>` or `<style>` tag, WebC keeps the custom element in the output it generates.
This way, if you’re creating a web component — that is, you’re defining a new element in the [custom element registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) — the custom element you’ve defined is in the markup so that the browser can upgrade it.
Or, if you’re simply using the custom element in some of you CSS selectors, it will actually be there for those selectors to match.

But sometimes you may be defining styles in your WebC component that don’t rely on the custom element.
Sometimes you just want to take advantage of the single file component format to colocate the styles for this set of markup with the markup itself.

Consider this rudimentary hero component:

<figure>

```html
<div class="hero">
	<slot name="image"></slot>
	<h1><slot name="title"></slot></h1>
</div>

<style>
	.hero {
		display: grid;
		grid-template-areas: hero;
		place-items: center;
		aspect-ratio: 1.618;
	}

	.hero > * {
		grid-area: hero;
	}

	.hero > img {
		place-self: stretch;
	}
</style>
```

<figcaption>hero-block.webc</figcaption>
</figure>

<aside>
Hat tip to <a href="https://thinkdobecreate.com/">Stephanie Eckles</a> for her <a href="https://smolcss.dev/#smol-stack-layout">Smol Stack Layout</a> from SmolCSS.
</aside>

Because of the `<style>` tag in this component, our final output will include the `<hero-block>` custom element.

<figure>

```html
<hero-block>
	<div class="hero">
		<h1><slot name="title"></slot></h1>
		<div class="image"><slot name="image"></slot></div>
	</div>
</hero-block>
```

<figcaption>HTML output by WebC after processing a file containing our hero component</figcaption>
</figure>

Since we’re not using the `hero-block` element for anything, we may not want it in our markup.
We’d rather it be removed as if the component were an HTML-only component.

<figure>

```html
<div class="hero">
	<h1><slot name="title"></slot></h1>
	<div class="image"><slot name="image"></slot></div>
</div>
```

<figcaption>Desired HTML output with the <code>&lt;hero-block&gt;</code> element removed</figcaption>
</figure>

We have two choices for how to remove the `<hero-block>` element:

1. Add `webc:nokeep` to the `<hero-block>` element
2. Add `webc:root="override"` to the `<div>` in our hero component

## Explicitly remove the custom element

We can explicitly mark a custom element — or, indeed, any element — for removal by adding the `webc:nokeep` attribute to the tag.

<figure>

```html
<hero-block webc:nokeep>
	<img src="/img/hypnotoad.gif" alt="The hypnotoad" slot="image" />
	<span slot="title">All Glory to the Hypnotoad</span>
</hero-block>
```

<figcaption>Use <code>webc:nokeep</code> any time we use <code>&lt;hero-block&gt;</code> to explicitly remove the custom element.</figcaption>
</figure>

Using `webc:nokeep` has the advantage of allowing us to selectively remove the custom element in some situations, while leaving it in place in others.
The disadvantage is that, if we _always_ want to remove the custom element, we have to remember to add the `webc:nokeep` attribute.
Forgetting to add the attribute could result in our layouts getting messed up because of an extra element in the markup.

## Automatically remove custom elements

We can also configure our hero component so that WebC automatically removes the custom elements anywhere it’s used.
For this, we need to add `webc:root="override"` to our root `<div>`.

<figure>

```html
<div class="hero" webc:root="override">
	<slot name="image"></slot>
	<h1><slot name="title"></slot></h1>
</div>

<style>
	/* Styles omitted for brevity */
</style>
```

<figcaption>hero-block.webc</figcaption>
</figure>

This approach guarantees that the custom element — `<hero-block>` — is always removed from the output.

### How it works

The `webc:root` attribute tells WebC to merge this root element with the custom element for the component.
This can be used so that if you have a `class` or `style` attribute set on both the custom element where it is invoked, and on the root element of the component, those attributes will be merged in the output.
When the root element of the component is merged into the custom element, the root element is discarded unless we set it to “override.” With a value of “override,” the `webc:root` attribute will remove the custom element and replace it with the component’s root element.

## References

-   [Override the host component tag](https://www.11ty.dev/docs/languages/webc/#override-the-host-component-tag) in the Eleventy docs
-   [webc:root](https://github.com/11ty/webc#attributes) in the WebC docs
