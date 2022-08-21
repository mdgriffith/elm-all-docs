# elm-material-color

This library allow to get Material colors as Elm Color.

## Installation

Run `elm install jpagex/elm-material-color`.

## Example

```elm
import Html exposing (Html, div, text)
import Html.Attributes exposing (style)
import MaterialColor

view : Html msg
view =
    div
        [ style "background-color" (Color.toCssString MaterialColor.indigo500)
        , style "padding" "15px"
        ]
        [ text "Hello!" ]
```

See `example` for the complete color list.
