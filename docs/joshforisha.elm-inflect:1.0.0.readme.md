# elm-inflect

`elm-inflect` lets you convert a String to its plural, singular, camelCase, and PascalCase forms.

## Examples

```elm
import Inflect exposing (pluralize, singularize, camelize, pascalize)

pluralize "axis" == "axes"
singularize "axes" == "axis"
camelize "foo _bar" == "fooBar"
pascalize "foo _bar" == "FooBar"
```

[Documentation](http://package.elm-lang.org/packages/utkarshkukreti/elm-inflect)

## License

The logic this package uses is borrowed from the [activesupport](https://github.com/rails/rails/tree/master/activesupport) Ruby gem and is therefore licensed under the same license: MIT.
