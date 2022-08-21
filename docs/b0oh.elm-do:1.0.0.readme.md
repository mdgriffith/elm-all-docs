# Elm do

Inspired by do-notation from Haskell.

## Problem

Quite often in the code we can have chains like this:

```elm
type alias Model =
    { id : Int
    , name : String
    , description : String
    }


Decode.field "id" Decode.int
    |> Decode.andThen
        (\id ->
            Decode.field "name" Decode.string
                |> Decode.andThen
                    (\name ->
                        Decode.field "description" Decode.string
                            |> Decode.andThen
                                (\description ->
                                    Just
                                        { id = id
                                        , name = name
                                        , description
                                        }
                                )
                    )
          )
```

That can be expressed in Haskell do-notation like:

```haskell
do
    id <- Decode.field "id" Decode.int
    name <- Decode.field "name" Decode.string
    description <- Decode.field "description" Decode.string
    Just
        { id = id
        , name = name
        , description
        }
```

Which is less cognitive complex for my perception.

## Solution

To emulate such a layout on our projects we use an idiom like this (warning: not compatible with elm-format):

```elm
Decode.do (Decode.field "id" Decode.int) <| \id ->
Decode.do (Decode.field "name" Decode.string) <| \name ->
Decode.do (Decode.field "description" Decode.string) <| \description ->
Just
    { id = id
    , name = name
    , description
    }
```

This library provides `do` functions for elm-core modules where it makes sense.
