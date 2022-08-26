# Form Elements

Useful elements for creating forms in Elm. Includes text inputs, autocomplete (or "super select"),
switches, radio buttons, and checkboxes. [You can see how everything actually looks here](https://abradley2.github.io/form-elements/)

To include in your project, add `FormElements.css` to your document.

To change variables in these styles, go into **theme.json**, edit the appropriate
variables, and run `npm install && npm run build-styles` to get an updated `FormElements.css` file.

# API

I highly recommend checking out the [source of the demo](https://github.com/abradley2/form-elements/blob/master/src/Demo.elm)
to learn how these elements work.

Each element has a `view` function at the very least for displaying the element. The `view` will
always take a `props` object or some argument that allows it to be configured. The more complex form
elements also take a `model` argument which is managed by an associated `update` function.

To simplify the API, many of these form elements use [component-result](https://package.elm-lang.org/packages/z5h/component-result/latest/).
