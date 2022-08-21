# Dynamic JSON in Elm

Simple utilities for processing JSON with too complex or unknown structure.

## Example

```elm
module Data exposing (decoder)

import Json.Dynamic as Dynamic exposing (Dynamic)

import Json.Decode as Decode exposing (Value)

{- Assume we receive data from outside as raw JSON value:

    {
      "movies" : [
        {
          "name" : "The Shawshank Redemption"
          "actors" : [
            "Tim Robbins",
            "Morgan Freeman"
          ]
        }
      ]
    }

    Using dynamic access, we can retrieve the list of actors without decoding
    the JSON into any intermediate type.
-}

getMovieActors : Value -> String -> List String
getMovieActors json movie =
    json
        |> Decode.decodeValue decoder
        |> at [ "movies" ]
        |> find
            (resolveAt [ "name" ] Decode.string >> equals movie)
        |> Maybe.andThen
            (resolveAt [ "actors" ] (Decode.list Decode.string) >> Result.toMaybe)
        |> Maybe.withDefault []

```
