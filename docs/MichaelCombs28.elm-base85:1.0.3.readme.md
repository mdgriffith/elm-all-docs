# Base85

[![Build Status](https://travis-ci.org/MichaelCombs28/elm-base85.svg?branch=master)](https://travis-ci.org/MichaelCombs28/elm-base85)

This library provides you with encoding / decoding of
[Base85](https://en.wikipedia.org/wiki/Ascii85).

## Usage

```elm
import Base85 exposing (encode, decode)
```

To decode a String use

```elm
decode : String -> Result String String
decode encodedString =
    Base85.decode encodedString
```

To encode a String use

```elm
encode : String -> String
encode string =
    Base85.encode string
```

