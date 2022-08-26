# elm-css-colors

This package uses [`elm-css`](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/)'s `Color` type to implement all of the named colors from the [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) spec.

## Example

```elm
import Css exposing (color)
import Css.Colors exposing (black, white)
import Html.Styled exposing (div, text, toUnstyled)
import Html.Styled.Attributes exposing (css)

main =
    div
        [ css
            [ color white
            , backgroundColor black
            ]
        ]
        [ text "Hello, World!" ]
        |> toUnstyled
```
