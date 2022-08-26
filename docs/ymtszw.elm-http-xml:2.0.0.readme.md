# elm-http-xml

Generates HTTP request for XML API. Can be used with [`elm/http`][http].

Using [`ymtszw/elm-xml-decode`][exd] for decoding XML response into Elm values.

[http]: http://package.elm-lang.org/packages/elm/http/latest
[exd]: http://package.elm-lang.org/packages/ymtszw/elm-xml-decode/latest

## Basic Example

```elm
import Http
import Http.Xml
import Xml.Decode exposing (..)

type alias Data =
    { string : String
    , integers : List Int
    }

type Msg = XmlApiResponse (Result Http.Error Data)

getXml : Cmd Msg
getXml =
    Http.get
        { url = "https://example.com/data.xml"
        , expect = Http.Xml.expectXml XmlApiResponse dataDecoder
        }

dataDecoder : Decoder Data
dataDecoder =
    map2 Data
        (path [ "path", "to", "string" ] (single string))
        (path [ "path", "to", "int", "list" ] (list int))

-- Use with customization
trickyGetXml : Cmd Msg
trickyGetXml =
    Http.riskyRequest
        { method = "GET"
        , headers = [ Http.header "Accept" "application/xml" ]
        , url = "https://example.com/data.xml"
        , body = Http.emptyBody
        , expect = Http.Xml.expectXml XmlApiResponse dataDecoder
        , timeout = Nothing
        , tracker = Nothing
        }

```

## Upgrade from 1.x to 2.x

- It now supports `elm/http@2.x`, which drops `Http.Request` data type. As a result, there is no interface to nicely add `Accept: application/xml` header.
  **You have to add the header** if your target servers rigorously require them.
  - Probably the most reasonable interface which should take `Accept` header values are `Http.Expect`.
  - See this issue: https://github.com/elm/http/issues/54

## License

BSD-3-Clause
