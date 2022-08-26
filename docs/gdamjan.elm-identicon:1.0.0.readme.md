# elm-identicon
Generate a GitHub style visual hash from a string (aka identicon).

This is a port of [pukkamustard/elm-identicon](https://github.com/pukkamustard/elm-identicon/) to elm 0.19,
but color generation has changed, since avh4/elm-color is slightly different than the old elm 0.18 Color.

## Example

```
import Identicon exposing (identicon)
import Html

main =
    identicon "200px" "Hello World"
```

Also see `example/` folder.
