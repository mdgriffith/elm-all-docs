# elm-vite-plugin-helper

An Elm package to provide helpers for using [vite-plugin-elm](https://github.com/hmsk/vite-plugin-elm).

## Install

```
elm install hmsk/elm-vite-plugin-helper
```

## Usage

```elm
import Html exposing (Html, img)
import Html.Attributes exposing (src)
import VitePluginHelper exposing(asset)

view : Model -> Html Msg
view _ =
    [
      img [ src <| asset "/assets/logo.png" ] []
      -- An exact URL or inline data for an asset should be provided by Vite
    ]
```
