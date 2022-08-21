# Extra Json Decode / Encode functionality

An extension of the `elm/json` package providing a set of helpers for working
other types of data (mostly the `Posix` data type from the `elm/time` package).

# Example

```elm
import Time exposing (Posix)
import Json.Decode as Decode
import Json.Decode.Extra as Decode
import Json.Encode as Encode
import Json.Encode.Extra as Encode


exampleDecoder : Decode.Decoder Posix
exampleDecoder =
    Decode.field "created_at" Decode.iso8601

exampleEncoder : Posix -> Encode.Value
exampleEncoder createdAt =
    Encode.object
        [ ( "created_at", Encode.iso8601 createdAt ) ]

Decode.decodeString exampleDecoder
    """
    { "created_at": "2019-12-03T11:45:09Z" }
    """
    --> Ok (Time.millisToPosix 1575373509000)

Encode.encode 0
    (exampleEncoder (Time.millisToPosix 1575373509000))
    --> """{"created_at":"2019-12-03T11:45:09.000Z"}"""

```
