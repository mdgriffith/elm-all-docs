# [Parser](https://package.elm-lang.org/packages/davidcavazos/parser/latest/)

An easy to use general-purpose parser for Elm.

This library aims to provide a clean and intuitive parsing library with good error messages out of the box.

> ℹ️ This has been inspired by the
[elm/parser](https://package.elm-lang.org/packages/elm/parser/latest/)
and [dasch/parser](https://package.elm-lang.org/packages/dasch/parser/latest/)
libraries.

## How to use

A good place to start is by defining the data type you want to parse into.
Then, it's a good idea to define a function to parse into that data type.

Here's a simple example to parse an 2D point, like `(42, 3.14)`.

```elm
import Parser exposing (Parser, drop, into, parse, succeed, take)
import Parser.Char exposing (char)
import Parser.Common exposing (number, spaces)
import Parser.Error

type alias Point =
    { x : Float
    , y : Float
    }

point : Parser Point
point =
    into "Point"
        (succeed Point
            |> drop (char '(')
            |> drop spaces
            |> take number
            |> drop spaces
            |> drop (char ',')
            |> drop spaces
            |> take number
            |> drop spaces
            |> drop (char ')')
        )

-- Here's how a successful parse looks like.
parse "(2.71, 3.14)" point --> Ok {x = 2.71, y = 3.14}

-- And we can get a nice error message if it fails.
point
    |> parse "(2.71, x)"
    |> Result.mapError (Parser.Error.dump "filename.txt")
--> Err
-->     [ "[ERROR] filename.txt:1:8: I was expecting a digit [0-9]. I got stuck when I got the character 'x'."
-->     , "  in Point at line 1:1"
-->     , ""
-->     , "1|(2.71, x)"
-->     , "  ~~~~~~~^"
-->     ]
```

## Usage

For more detailed documentation of the functions available an code examples on how to use them, check the modules:

* [**`Parser`**](https://package.elm-lang.org/packages/davidcavazos/parser/latest/Parser)
    -- Basic functions on creating and chaining parsers.
* [**`Parser.Common`**](https://package.elm-lang.org/packages/davidcavazos/parser/latest/Parser-Common)
    -- Common parsers like parsing integers and numbers.
* [**`Parser.Sequence`**](https://package.elm-lang.org/packages/davidcavazos/parser/latest/Parser-Sequence)
    -- Sequences of parsers.
* [**`Parser.Expression`**](https://package.elm-lang.org/packages/davidcavazos/parser/latest/Parser-Expression)
    -- Expressions with operator precedence.
* [**`Parser.Check`**](https://package.elm-lang.org/packages/davidcavazos/parser/latest/Parser-Check)
    -- Checking and lookaheads without consuming inputs.
* [**`Parser.Error`**](https://package.elm-lang.org/packages/davidcavazos/parser/latest/Parser-Error)
    -- Functions for error reporting and formatting.
