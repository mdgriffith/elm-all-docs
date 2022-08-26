# elm-hsl-color

This package is the HSL version of [elm-color](https://package.elm-lang.org/packages/avh4/elm-color/latest/)

## Example

```elm
import HslaColor exposing (HslaColor)
import Html exposing (Html)
import Html.Attributes exposing (style)

view : HslaColor -> Html msg
view foreground =
    let
        hue =
            (HslaColor.toHsla foreground).hue

        borderColor =
            HslaColor.hsla hue 0.75 0.5 0.8
    in
    Html.div
        [ style "background-color" (HslaColor.toCssString HslaColor.lightOrange)
        , style "color" (HslaColor.toCssString foreground)
        , style "border-color" (HslaColor.toCssString borderColor)
        ]
        [ Html.text "(ᵔᴥᵔ)" ]
```
