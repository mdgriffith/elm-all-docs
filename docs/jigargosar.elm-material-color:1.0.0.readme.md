# elm-material-color

Material colors as RGB records

This is `Elm 0.19` compatible __fork__ of "jpagex/elm-material-color"


## Example

```elm
import MaterialColor as MC
import Html exposing (Html)
import Html.Attributes exposing (style)

view : Html msg
view =
    Html.div
        [ style "background-color" (MC.toRgbString MC.red50)
        , style "color" (MC.toRgbString MC.pink600)
        , style "border-color" (MC.toRgbString MC.purple900)
        ]
        [ Html.text "(ᵔᴥᵔ)" ]
```
