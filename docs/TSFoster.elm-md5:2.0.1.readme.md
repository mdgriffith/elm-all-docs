# TSFoster/elm-md5

[![Build Status](https://travis-ci.org/TSFoster/elm-md5.svg?branch=feature%2Felm019)](https://travis-ci.org/TSFoster/elm-md5)

Compute MD5 message digests of arbitrary data in Elm.

This is a fork of [truqu/elm-md5](https://github.com/truqu/elm-md5), a much more
useful package (in almost all cases) for computing MD5 digests. This package is
useful for digesting non-string data.

## Quick Start

This library exposes just one function, `fromBytes`, which takes a `List` of
`Int`s between 0 and 31, and returns the 128-bit MD5 digest as a `List` of
`Int`s between 0 and 31.

```elm
import String.UTF8

MD5.fromBytes (String.UTF8.toBytes "hello world")
-->    [ 0x5e , 0xb6 , 0x3b , 0xbb
-->    , 0xe0 , 0x1e , 0xee , 0xd0
-->    , 0x93 , 0xcb , 0x22 , 0xbb
-->    , 0x8f , 0x5a , 0xcd , 0xc3
-->    ]
```

## License

Licensed under BSD-3. See `LICENSE` file. (c) 2016-2018 Mark Orr, 2018-present
TruQu, 2018-present Toby Foster
