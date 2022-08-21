# Expect Bytes with Http

This package provides the function `expectBytes` that you will expect for Http.

You will not wasting time searching how to do just receive Bytes from `Http.get` any more.

[1]: https://stackoverflow.com/questions/60383450/elm-byte-decoding-within-http-get

# Example

```elm

    import Bytes exposing (Bytes)
    import Http
    import Http.Just

    type Msg
        = GotBytes (Result Http.Error Bytes)

    getBytes : Cmd Msg
    getBytes =
        Http.get
            { url = "/bytes"
            , expect = Http.Just.expectBytes GotBytes
            }

```