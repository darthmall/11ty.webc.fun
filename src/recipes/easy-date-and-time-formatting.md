---
title: Easy Date and Time Formatting with Luxon
description: Override the &lt;time> element to accept date objects and Luxon format strings to make date formatting easy.
---

In this recipe, we’ll create a WebC component that uses [Luxon](https://moment.github.io/luxon/#/) to format `<time>` elements for you. Eleventy already has a dependency on Luxon, so we don’t even have to install anything.

## Using the Component

Before we look at how to build the component, let’s look at what it will look to use the component. The component we’ll build will be invoked like this:

<figure>

```html
<luxon-time :@value="page.date" @machine-format="yyyy-LL-dd" @format="d LLLL yyyy"></luxon-time>
```

<figcaption>Example use of our time-formatting <code>&lt;luxon-time></code> element.</figcaption>
</figure>

The `value` property is how we pass our date as either a JavaScript `Date` object or an ISO date string. We use `:@` to ensure that the property is private (`@`) and doesn’t end up on the final HTML output and that WebC knows to evaluate the attribute value as a variable reference (`:`).

The `machine-format` property provides a format string used to format the date for use in the `<time>` element’s `datetime` attribute. We’ll make this property optional and use an ISO datetime format if it’s missing. We use an `@` here to ensure that the property is also private, but we skip the `:` because we want this string to be treated as a string. We don’t want Eleventy evaluating a Luxon format string as JavaScript.

Finally, the `format` property is another Luxon format string. This one is used to define the format displayed as the `<time>` element’s text content. We can also make this property optional, if we have a default format we like for dates. Again, we use an `@` when we invoke the component to avoid this attribute ending up in our final HTML.

## Implementing the Component

The component itself is relatively short.

<figure>

```html
<script webc:type="js">
  const { DateTime } = require("luxon");
  const dt = value instanceof Date
    ? DateTime.fromJSDate(value)
    : DateTime.fromISO(value);

  const datetime = machineFormat ? dt.toFormat(machineFormat) : dt.toISO();
  const display = dt.toFormat(format || site.dateFormat);

  `<time datetime="${datetime}">${display}</time>`
</script>
```

<figcaption>luxon-time.webc</figcaption>
</figure>

The first thing we do is we import the `DateTime` object from Luxon and parse the date value passed to the component. We check to see if `value` is an instance of a JavaScript `Date` object or not. If it is, we call `DateTime.fromJSDate`, otherwise we assume it’s an ISO string and we call `DateTime.fromISO`.

<figure>

```js
const { DateTime } = require("luxon");
const dt = value instanceof Date
  ? DateTime.fromJSDate(value)
  : DateTime.fromISO(value);
```

<figcaption>Create the Luxon <code>DateTime</code> object from the value provided to our WebC component.</figcaption>
</figure>

Next, we use our format strings to generate two formatted dates for our final output. First, we generate the string for the `datetime` attribute. If `machineFormat` is present, call `toFormat` with the format string, otherwise generate an ISO string. Then we generate the string used as the text content of the `<time>` element—the text that is displayed to readers. Again, we check if a custom format string has been provided. If no format string is provided, we use a fallback format string. You can either define this string in the component itself as a string literal, or—the way I like to do—you can add some global data for your whole site containing your default date format.

<figure>

```js
const datetime = machineFormat ? dt.toFormat(machineFormat) : dt.toISO();
const display = dt.toFormat(format || site.dateFormat);
```

<figcaption>Generate formatted strings from our date object.</figcaption>
</figure>

Finally, we generate a valid HTML `<time>` element using our formatted strings.

<figure>

```js
`<time datetime="${datetime}">${display}</time>`
```

<figcaption>Use the formatted strings in an HTML <code>&lt;time></code> element.</figcaption>
</figure>

