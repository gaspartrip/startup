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

# 7. Imagine there is a declaration like class="oh-no-inline-styles" style="background:red" and you need to change the background to green without changing the inline style. How could you accomplish this?

Adding !important will give this rule more precedence over the inline style.
Like this:

.oh-no-inline-styles {
  background: green !important;
}