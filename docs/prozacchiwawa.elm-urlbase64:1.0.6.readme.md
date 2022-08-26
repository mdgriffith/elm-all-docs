# Elm UrlBase64

Wrapper functions that convert to and from the url base64 alphabet on behalf of a base64 encoder and decoder.

A couple of functions for use with a base64 encoder and decoder that convert the
base64 alphabet to and from the url alphabet.

They can be composed with encode and decode in truqu/elm-base64 like this:

```elm
b64e = UrlBase64.encode Base64.encode
b64d = UrlBase64.decode Base64.decode
```

Applying these to url base64 converts to and from standard base64 into and out
of the decoders underneath.

```elm
base64_1 = b64e "a\255\255" -- Ok "Yf__"
base64_t = b64e "a\255\255" |> Result.andThen b64d -- Ok "aÿÿ"
base64_2 = b64e "a\255" -- Ok "Yf8"
```
