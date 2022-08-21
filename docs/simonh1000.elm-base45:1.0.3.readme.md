# Elm-Base45 decoding and encoding

An implementation of [Base 45](https://datatracker.ietf.org/doc/draft-faltstrom-base45/) Data Encoding, which is designed to work with QR codes.

The API exposes two APIs

```
Base45.encode (Bytes.encode <| Bytes.string "ietf!")
-- returns "QED8WEX0"
 
Base45.decode "QED8WEX0"
-- returns bytes that correspond to string "ietf!"
```



### JS example

node tests/example.js