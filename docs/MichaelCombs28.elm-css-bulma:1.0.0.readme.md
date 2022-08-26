# Elm Bulma

This is a copy of the [surprisetalk/elm-bulma](https://package.elm-lang.org/packages/surprisetalk/elm-bulma/latest/)
API but ported to use [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/)

## Documentation

- Learn about the components at [bulma.io](http://bulma.io/).
- For API information, head over to the [Elm package](http://package.elm-lang.org/packages/MichaelCombs28/elm-css-bulma/latest).

## Getting Started

1. Make a new project: `mkdir bulma-example && cd bulma-example`.
2. Install the package: `elm package install --yes surprisetalk/elm-bulma`.
3. Create a new file `Example.elm` and copy [this example file](https://github.com/surprisetalk/elm-bulma/blob/master/src/Example.elm) or the code below.
4. Start `elm reactor` and navigate to [http://localhost:8000/Example.elm](http://localhost:8000).

```elm
module Example exposing (..)

import Browser
import Bulma.CDN exposing (..)
import Bulma.Modifiers exposing (..)
import Bulma.Elements exposing (..)
import Bulma.Columns exposing (..)
import Bulma.Layout exposing (..)
import Html exposing ( Html, main_, text )

type alias Model = {}

main : Program () Model Msg
main
  = Browser.sandbox
    { init = {}
    , view = view
    , update = \msg -> \model -> model
    }

view : Model -> Html msg
view model
  = main_ []
    [ stylesheet
    , exampleHero
    , exampleColumns
    ]

exampleHero : Html msg
exampleHero
  = hero { heroModifiers | size = medium, color = primary } []
    [ heroBody []
      [ container []
          [ title h1 [] [ text "Hero Title" ]
          , title h2 [] [ text "Hero Subtitle" ]
          ]
      ]
    ]

exampleColumns : Html msg
exampleColumns
  = section NotSpaced []
    [ container []
      [ columns columnsModifiers []
        [ column columnModifiers [] [ text "First Column" ]
        , column columnModifiers [] [ text "Second Column" ]
        , column columnModifiers [] [ text "Third Column" ]
        ]
      ]
    ]
```

## Contributions

- Feel free to [report bugs on Github](https://github.com/surprisetalk/elm-bulma/issues).
- If you have any suggestions on how to make the API more friendly, please reach out to me at [surprisetalk@gmail.com](surprisetalk@gmail.com).

## Friends

- [elm-bootstrap](http://package.elm-lang.org/packages/rundis/elm-bootstrap/latest)
