# elm-css-modern-normalize

An Elm port of [modern-normalize](https://github.com/sindresorhus/modern-normalize) for [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

## Install

```
elm install hmsk/elm-css-modern-normalize
```

## Usage

```elm
import Css.ModernNormalize as ModernNormalize

view : Model -> Html Msg
view _ =
    [
      ModernNormalize.globalHtml
      -- Your application view comes here
    ]
```

### elm-css friendly functions

```elm
import Css exposing (color, hex)
import Css.Global exposing (global, selector)
import Css.ModernNormalize as ModernNormalize
import Html.Styled

buildGlobal : Html.Styled.Html msg
buildGlobal =
    global <|
        [
          selector ".myGlobalStyle" [ color <| hex "#597B8C" ]
        ]
          ++ ModernNormalize.snippets
```

```elm
import Css.ModernNormalize as ModernNormalize
import Html.Styled exposing (h1)

styledView : Html.Styled.Html msg
styledView =
    [ h1 [] [text "header"]
    , ModernNormalize.globalStyledHtml
    ]
```

## License

[MIT](/LICENSE)
