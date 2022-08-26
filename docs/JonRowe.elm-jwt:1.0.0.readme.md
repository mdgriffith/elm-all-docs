# Elm helpers for working with Jwt tokens.

A collection of functions to decode [Jwt tokens](https://jwt.io/).

## Decode a token

A Jwt is a Base64 string that has three parts

    * header
    * content
    * signature

The library functions `decodeToken` and `tokenDecoder` provide the means to decode the content of a token, while `checkTokenExpiry` and `isExpired` specifically analyse whether the token remains within its expiry time.

## Examples

[Examples](https://github.com/simonh1000/elm-jwt/tree/master/examples) are included of the software working with Phoenix and Node backends. More discussion of the Phoenix example can be found in this [blog post](http://simonh1000.github.io/2016/05/phoenix-elm-json-web-tokens/).

## Changelog

* 1.0.0: Fork from simonh1000/elm-jwt to remove the dependency on elm/http
