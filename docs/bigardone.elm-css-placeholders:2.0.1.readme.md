# elm-css-placeholders

A package to generate HTML placeholders using [elm-css](https://github.com/rtfeldman/elm-css), inspired by [https://github.com/phuoc-ng/csslayout](https://github.com/phuoc-ng/csslayout). Still WIP tho.

## Installation

Install this package with:

`elm install bigardone/elm-css-placeholders`

## Placeholders

### Block

Renders a text block placeholder.

```elm

import Placeholders.Block

...

view : Model -> Html Msg
view model =
    Html.Styled.section
        []
        [ Html.Styled.div
            []
            [ Html.Styled.h2
                []
                [ Html.Styled.text "Text block" ]
            , Placeholders.Block.view Placeholders.Block.default
            ]
        ]
```
