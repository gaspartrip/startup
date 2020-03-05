# Responses to questions:

# 6. How could you add weight to the global font definition to win over the classes added by point 3?

Even if I set the font-size of the html selector to "!important", this property are set only on the html element,
so this isn't gonna override the classes selectors.
A way to override them is to change from html to the CSS Universal Selector * (all HTML elements on the page)
with the font-size with !important.
Like this:

* {
  font-size: 14px !important;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}