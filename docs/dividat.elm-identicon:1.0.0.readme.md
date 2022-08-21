# elm-identicon
Generate a GitHub style visual hash from a string (aka [identicon](https://en.wikipedia.org/wiki/Identicon)).

## Examples

Simple usage: 

``` elm
identicon "200px" "Hello identicon!"
```

This will draw a `200px` by `200px` identicon, generated from the `"Hello
identicon!"` string.

Advanced usage: 

You can customize rendering by bringing your own hasher and/or color functions. For example, the
following would always draw a red identicon:

``` elm
import Color exposing (rgb255) -- from avh4/elm-color
import Identicon

view =
    Identicon.custom Identicon.defaultHash (always <| rgb255 255 0 0) "200px" "Hello Identicon!"
```

Also have a look at the
[`example/`](https://github.com/dividat/elm-identicon/tree/master/example)
folder for a more detailed use case.
