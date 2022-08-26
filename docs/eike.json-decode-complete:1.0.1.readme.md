This package allows you to write decoders for JSON objects that make sure that you handled all fields of the incoming JSON. For example,

    import Json.Decode as D exposing (Decoder)
    import DecodeComplete exposing (..)

    type alias User =
        { name : String
        , age : Int
        }

    userDecoder : Decoder User
    userDecoder =
        object User
            |> require "name" D.string
            |> require "age" D.int
            |> discard "email"
            |> complete

decodes JSON objects that have precisely the fields `name`, `age`, and `email` and turns it into a `User` record, discarding the email address.

These decoders are turned into regular `Decoder`s at the end, so that they can be used with normal elm/json code.