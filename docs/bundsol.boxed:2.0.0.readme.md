# Boxed
An Elm union type and library to encapsulate any primitive in a single type


## Motivation
Oftentimes, you find yourself tailoring decoders for all the different schemas
or records that you are expecting from the back end. But what if you simply come
up with a decoder that stores those records, say, as a Dict? And forget for
the moment about the type of each member of the record. You can deal with
that later. You won't worry about the names of the fields in your record, either.

All of that postponed work can be encoded in your updaters or views. You look
for a field with a certain name, of a certain type, in your dictionary. If not
found then no update happens. If it should have been found, then you can start
debugging your code (or your back end code).


## Example
The sample data in the following example has been taken from the 
[`RAML 200 Tutorial`](https://raml.org/developers/raml-200-tutorial).

Save this code in a file called Demo.elm,

```elm 
module Demo exposing (schema, albumId)

import Json.Encode as Encode
import Json.Decode as Decode exposing (decodeValue, string, field, bool, dict)
import Boxed exposing (Boxed(..))
import Boxed.Json
import Dict exposing (Dict)


o = Encode.object
s = Encode.string
b = Encode.bool
i = Encode.int


albumIdSample = o
  [ ("type" , s "string")
  , ("required" , b True)
  , ("minLength" , i 36)
  , ("maxLength" , i 36)
  ]

sample = o
  [ ("type" , s "object")
  , ("$schema" , s "http://json-schema.org/draft-03/schema")
  , ("id" , s "http://jsonschema.net")
  , ("required" , b True)
  , ("properties" , o
      [ ("songTitle" , o
          [ ("type" , s "string")
          , ("required" , b True)
          ]
        )
      , ("albumId" , albumIdSample)
      ]
    )
  ]


type alias Schema = 
  { type_: String 
  , schema_: String
  , id : String 
  , required : Bool
  , properties : Dict String (Boxed ())
  }


invalidSchema : Schema 
invalidSchema = 
  { type_ = "" 
  , schema_ = ""
  , id = "" 
  , required = False
  , properties = Dict.empty
  }
  
  
schemaDecoder =
  Decode.map5 Schema 
    (field "type" string)
    (field "$schema" string)
    (field "id" string)
    (field "required" bool)
    (field "properties" (dict Boxed.Json.decoder))

    
schema : Schema    
schema = 
  decodeValue schemaDecoder sample
  |> Result.withDefault invalidSchema


albumId : Boxed ()    
albumId = 
  decodeValue Boxed.Json.decoder albumIdSample
  |> Result.withDefault Null
```



Run `elm-repl` and type as follows 

    > import Demo exposing (..)
    > import Boxed exposing (..)
    > import Boxed.Dictionary exposing (apply, mapGet)
    > import Maybe exposing (withDefault)
    > import Dict exposing(get)
    > get "songTitle" schema.properties |> withDefault Null |> apply (get "type")
    Just (Str "string") : Maybe.Maybe (Boxed.Boxed ())
    > mapGet asInt "maxLength" albumId
    Just 36 : Maybe.Maybe Int
    > mapGet asBool "required" albumId
    Just True : Maybe.Maybe Bool
    
    


A field like `properties`, seen above as member of Schema, is found many times
in API specifications. And, although the top level structure of Schema may 
remain pretty much the same, the contents of the `properties` member can be
expected to be more dynamic. And that is where we can use the `Boxed` type as 
a catch-all, maybe even for rapid prototyping.




