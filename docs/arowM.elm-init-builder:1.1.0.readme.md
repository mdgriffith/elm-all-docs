# elm-init-builder

[![Build Status](https://travis-ci.org/arowM/elm-init-builder.svg?branch=main)](https://travis-ci.org/arowM/elm-init-builder)

Build the root init function from submodel init functions.

# A Quick Example


```elm
type alias Model =
    { field1 : Field1.Model
    , field2 : Field2.Model
    , field3 : Field3.Model
    }


init : () -> Url -> Key -> ( Model, Cmd Msg )
init _ url key =
    top Model
        |> field Field1.init
        |> field Field2.init
        |> field Field3.init
        |> andThen moreModifications
```
