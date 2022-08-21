# elm-md5
[![Build Status](https://travis-ci.org/truqu/elm-md5.svg?branch=master)](https://travis-ci.org/truqu/elm-md5)

Compute MD5 message digests in Elm.

This is a maintained fork of sanichi/elm-md5 focusing on performance.

## Quick Start

This library exposes just one function, `hex`, which takes a `String` input and returns the 128-bit MD5
digest as a `String` of 32 hexadecimal characters.

```elm
MD5.hex ""          == "d41d8cd98f00b204e9800998ecf8427e"
MD5.hex "foobarbaz" == "6df23dc03f9b54cc38a0fc1483df6e21"
```

Unlike the [JavaScript function](https://css-tricks.com/snippets/javascript/javascript-md5/) from which this
implementation has been ported, CRLF pairs in the input are not automatically replaced with LFs prior to computing
the digest. If you want that behaviour, adjust the input before evaluating the function. For example:

```elm
myHex : String -> String
myHex input =
    let
        myInput =
            Regex.replace Regex.All (Regex.regex "\x0D\n") (\_ -> "\n") input
    in
        MD5.hex myInput
```

## License

Licensed under BSD-3. See `LICENSE` file. (c) 2016-2018 Mark Orr, 2018-present TruQu
