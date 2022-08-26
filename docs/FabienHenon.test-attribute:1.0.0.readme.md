# test-attribute [![Build Status](https://travis-ci.org/calions-app/test-attribute.svg?branch=master)](https://travis-ci.org/calions-app/test-attribute)

With the `TestAttribute` module you can add attributes to your html elements only for `Test` env.
This allows you to select DOM elements with these attributes for your end to end tests.

## Getting started

Here is how to add an id test attribute to an element:

```elm
div [ class "element", TestAttribute.addId "my-element" env ] [ text "My element" ]
```
