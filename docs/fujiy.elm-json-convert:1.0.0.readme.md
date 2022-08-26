# JSON Converter in Elm

This package provides a method to write JSON encoders and decoders more efficiently.

# Description

To convert Elm values and JSON values in Elm, you needed to write encoders and decoders using [`elm/json`](https://package.elm-lang.org/packages/elm/json/latest/) package like this:

```elm
import Json.Decode as Decode
import Json.Encode as Encode


type alias User =
    { name : String
    , age : Int
    , height : Maybe Float
    }


encoder : User -> Value
encoder user =
    Encode.object
        [ ( "name", Encode.string user.name )
        , ( "age", Encode.int user.age )
        , ( "height"
          , case user.height of 
              Nothing -> Encode.null
              Just h -> Encode.float h
          )
        ]


decoder : Decode.Decoder User
decoder =
    Decode.map3 User
        (Decode.field "name" Decode.string)
        (Decode.field "age" Decode.int)
        (Decode.field "height" <| Decode.nullable Decode.float)
        
json = "{ \"name\": \"tom\", \"age\": 42, \"height\": 1.8 } }"
data = { name = "tom", age = 42, height = Just 1.8 }

-- Encode.encode 0    (encoder data) ==    json
-- Decode.decodeString decoder json  == Ok data
```
However, this kind of boilerplates are boring and redundant. 

The basic idea, inspired by [invertible-syntax](https://hackage.haskell.org/package/invertible-syntax), is that an encoder and a decoder are inverses of each other and have almost the same composition.
By using this package, you only need to write such a boilerplate only once for each data structure, and you can get both an encoder and a decoder like this:

```elm
import Json.Convert as Convert

type alias User =
    { name : String
    , age : Int
    , height : Maybe Float
    }

converter : Convert.Converter User
converter =
    object User
        <| Convert.field "name" .name Convert.string
        >> Convert.field "age" .age Convert.int
        >> Convert.option "height" .height Convert.float
 

json = "{ \"name\": \"tom\", \"age\": 42, \"height\": 1.8 } }"
data = { name = "tom", age = 42, height = Just 1.8 }

-- Converter.encode       converter 0 data ==    json
-- Converter.decodeString converter   json == Ok data
```

`Json.Convert` supports basic primitives, container data types, and objects.
