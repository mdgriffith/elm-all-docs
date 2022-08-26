# Yajson [![Build Status](https://travis-ci.org/emilianobovetti/elm-yajson.svg?branch=master)](https://travis-ci.org/emilianobovetti/elm-yajson)

Please note that this library was written for scholastic purpose. For production needs refer to [elm/json](https://package.elm-lang.org/packages/elm/json/latest/).

If, like me, you are studying Elm and wondering if it is possible to handle JSON without writing decoders, the answer – of course – is “yes”. I have referred to OCaml [Yojson](https://github.com/mjambon/yojson) library, and in particular I have ported in Elm some parts of [Yojson.Basic.Util](https://mjambon.github.io/mjambon2016/yojson-doc/Yojson.Basic.Util.html) module.

In the end (not surprisingly), it turns out that `elm/json` is the best option for the vast majority of contexts.

I decided to publish this library as a case study, to show how decoders approach may seem hard at first, but it remains the best option for Elm.

## Examples

Say we have a json like the following:

```elm
rawJson : String
rawJson =
    """
    { "squadName": "Super hero squad"
    , "homeTown": "Metro City"
    , "formed": 2016
    , "secretBase": "Super tower"
    , "active": true
    , "members":
        [
            { "name": "Molecule Man"
            , "age": 29
            , "secretIdentity": "Dan Jukes"
            , "powers":
                [ "Radiation resistance"
                , "Turning tiny"
                , "Radiation blast"
                ]
            }
        ,
            { "name": "Madame Uppercut"
            , "age": 39
            , "secretIdentity": "Jane Wilson"
            , "powers":
                [ "Million tonne punch"
                , "Damage resistance"
                , "Superhuman reflexes"
                ]
            }
        ,
            { "name": "Eternal Flame"
            , "age": 1000000
            , "secretIdentity": "Unknown"
            , "powers":
                [ "Immortality"
                , "Heat Immunity"
                , "Inferno"
                , "Teleportation"
                , "Interdimensional travel"
                ]
            }
        ]
    }
    """
```

if we want a list of powers, with standard library the code may look like this

```elm
powersDecoder : Json.Decode.Decoder (List (List String))
powersDecoder =
    Json.Decode.string
        |> Json.Decode.list
        |> Json.Decode.field "powers"
        |> Json.Decode.list
        |> Json.Decode.field "members"


powers : List String
powers =
    rawJson
        |> Json.Decode.decodeString powersDecoder
        |> Result.withDefault []
        |> List.concat
```

while with Yajson we could write

```elm
powers_ : List String
powers_ =
    rawJson
        |> Yajson.fromString
        |> Result.withDefault Yajson.Null
        |> Yajson.member "members"
        |> Maybe.map Yajson.toList
        |> Maybe.withDefault []
        |> Yajson.filterMember "powers"
        |> Yajson.flatten
        |> Yajson.filterString
```

For more usage examples look [here](https://github.com/emilianobovetti/elm-yajson/tree/master/examples).
