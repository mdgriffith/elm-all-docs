# elm-iso3166-data

Information about world countries. This library contains lists of facts about countries.


### Convert Alpha-2 Code to name
Find the name of a country including the country name in local language in parenthesis


### Convert Alpha-2 Code to flag
Find the flag of a country in this sprite sheet.

![Sprite sheet](assets/flag.png)

```elm
> import Iso3166
> Dict.get Iso3166.flagPositions "MX"
Just ( -112, -144 )
    : Maybe.Maybe (Float, Float)
> import Html exposing (div)
> (x, y) = (-112, -144)
> div
    [ style "background-image" ("url(\"" ++ Iso3166.flagImageData ++ "\")"
    , style "background-position" (String.fromFloat x ++ "px " ++ String.fromFloat y ++ "px")
    , style "width" "16px"
    , style "height" "16px"
    ]
    []
```

