# elm-ui-hexcolor

![](https://github.com/TheSacredLipton/elm-ui-hexcolor/workflows/Node.js%20CI/badge.svg)

Add hex color declarations to elm-ui.

## Example

```elm
module Main exposing (main)

import Element exposing (..)
import Element.Background as Background
import Element.HexColor as HexColor
import Html exposing (Html)


hex : (Color -> Attribute msg) -> String -> Attribute msg
hex colorattr colorhex =
    case HexColor.hex colorhex of
        Just color ->
            colorattr color

        Nothing ->
            inFront <| text <| "Color conversion failed:" ++ colorhex


bgColor : String -> Attribute msg
bgColor =
    hex Background.color


main : Html msg
main =
    layout [] <|
        column
            []
            [ el
                [ width <| px 100
                , height <| px 100
                , bgColor "#212121"
                ]
                none
            , el
                [ width <| px 100
                , height <| px 100
                , bgColor "#2121"
                ]
                none
            ]
```