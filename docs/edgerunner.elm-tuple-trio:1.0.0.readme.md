# The missing 3-tuple

Elm 0.19 limited the [`Tuple`](https://package.elm-lang.org/packages/elm/core/latest/Tuple) to just 2 or 3 elements. Still, the offical core `Tuple` module
ignores the 3-tuple completely.

This library replicates the core 2-tuple API for its neglected larger sibling.
It is very sparse, with one constructor, three element accessors and four mappers.