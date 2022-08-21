# elm-bitcoin
Bitcoin price web component made using Elm. Thanks to this extension, you can reflect in your application the current price of bitcoin in dollars.

## Use

```elm
module Main exposing (main)

import Bitcoin exposing (Model, Msg(..), init, update)
import Browser
import Html exposing (..)


view : Model -> Html Msg
view model =
    Html.div []
        [ Bitcoin.view model
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
```

## CSS

A component has been added to the component so that you can customize it as you wish. The class is called "bitcoin-usd-price-component".