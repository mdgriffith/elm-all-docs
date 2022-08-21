# Agnostic library for building Forms

Provides a set of configuration options for building forms components.

# Configuring fields

You can only reconstruct the original (opaque) type:

`type FormField model msg
    = FormField (FormFieldConfig model msg)`

By using one of these configuration methods:

`textConfig`, `passwordConfig`, `textareaConfig`, `checkboxConfig`, `checkboxWithOptionsConfig`, `selectConfig`, `radioConfig`, `autocompleteConfig`, `datepickerConfig`, `pureHtmlConfig`


Once configured, a field must be rendered by calling one of these methods:

`render`, `renderWithGroup`, `wrapper`

You can always check the status of a field by using:

`isValid`, `isPristine`

# Use example
See `examples/App.elm`

# Running example
- Run `elm-reactor`
- Open `http://localhost:8000`
- Navigate to `http://localhost:8000/examples/App.elm`
