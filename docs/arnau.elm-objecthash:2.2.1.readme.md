# Objecthash in Elm

Implementation of [Ben Laurie's
objecthash](https://github.com/benlaurie/objecthash) in Elm.


## Usage

There are a few interfaces available. The main module offers two functions
`objecthash` and `fromJson`. The former expects an `Objecthash.Value` and the
latter a JSON string.

```elm
import Objecthash exposing (fromJson, objecthash)
import Objecthash.Value exposing (Value(..))

fromJson """{"k1":"v1","k2":"v2","k3":"v3"}"""
-- Ok "ddd65f1f7568269a30df7cafc26044537dc2f02a1a0d830da61762fc3e687057"

objecthash <| VSet [VInteger 1, VInteger 2]
-- "ee104c03e5465735a9fb3fa5d0f19199297a135486fa76930c69cec825f8dac8"
```

The `Objecthash.Json` module exposes a set of functions to decode JSON built
on top of the `Json.Decode` from core. For example, the `Objecthash.fromJson`
mentioned above is implemented as:

```elm
import Objecthash.Json exposing (decode)

fromJson : String -> Result String String
fromJson input =
    input
        |> decode
        |> Result.map objecthash
```

The function `Json.decode` is a combined decoder that assumes all arrays in
the JSON blob are lists and all numbers floats. You can use your own decoder
with the `Json.decodeWith` function.

Note that `Json.decode` aligns with other objecthash “Common JSON”
implementations. This is the reason for having numbers as floats.

Finally, the `Objecthash.Hash` module exposes a set of functions to operate on
Elm values and return the hashed bytes.

```elm
import Dict
import Objecthash.Hash exposing (dict, unicode, toHex)

toHex <| dict (Dict.fromList [ ( "foo", unicode "bar" ) ])
-- "7ef5237c3027d6c58100afadf37796b3d351025cf28038280147d42fdc53b960"
```

## Redaction

This implementation offers a similar mechanism for redaction as the one
offered by [Ben Laurie's Python implementation](https://github.com/benlaurie/objecthash/blob/master/objecthash.py).

In short, objecthash lets you redact parts of a data structure and keep the
final hash intact. To do that, is represents redacted parts as tagged strings
of the form `**REDACTED***{hexadecimal representation of the hashed value}`.

For example, given the JSON blob:

```elm
fromJson """{"foo": {"x": 1}, "bar": {"x": 2}}"""
Ok "56b425f5e640238f9481dbf227d3b3aa023905b91e9941e6c987e56bd37ec6a3"
```

And the fact that `{"x": 1}` has the hash `480499ec4efe0e177793c217c8227d4096d2352beee2d6816ba8f4e8a421a138`:

```elm
fromJson """{"x": 1}"""
Ok "480499ec4efe0e177793c217c8227d4096d2352beee2d6816ba8f4e8a421a138"
```

You can redact the original value for the `foo` key as follows:

```elm
fromJson """{"foo": "**REDACTED**480499ec4efe0e177793c217c8227d4096d2352beee2d6816ba8f4e8a421a138", "bar": {"x
": 2}}"""
Ok "56b425f5e640238f9481dbf227d3b3aa023905b91e9941e6c987e56bd37ec6a3"
```

And still get the same result.


## Contribute

To run a clone of this project locally, you need
[Yarn](https://yarnpkg.com/) (and nodejs):

```sh
yarn install
```

To run the test suite:

```sh
yarn test
```

Note that the elm tooling is installed local to the project so as long as you
use commands via `yarn` you should be fine.

## Notice

This library inlines some dependencies due to Elm's 0.19 debacle.

### https://github.com/ktonon/elm-crypto

Copyright (c) 2017 Kevin Tonon <kevin@betweenconcepts.com>

Licensed under the MIT license <LICENSE or http://opensource.org/licenses/MIT>,
at your option. This file may not be copied, modified, or distributed except
according to those terms.

### https://github.com/ktonon/elm-word

Copyright (c) 2017 Kevin Tonon <kevin@betweenconcepts.com>

Licensed under the MIT license <LICENSE or http://opensource.org/licenses/MIT>,
at your option. This file may not be copied, modified, or distributed except
according to those terms.


## License

Copyright (c) 2018 elm-objecthash contributors licensed under [BSD-3-clause](LICENSE).
