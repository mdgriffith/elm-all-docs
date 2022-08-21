# RadixInt

This swaps between Int (Base 10) and RadixInt (Base Int)

You can use this directly:

```

RadixInt.fromInt (Base 6) 34
    |> RadixInt.toList -- [4,5] (54 in base6 == 34 in base10)
    |> List.indexedMap Tuple.pair -- [(0,4),(1,5)]
```

Or, wrap it in a custom type to hide the implementation of the base:

```
module Senary exposing (Senary, fromInt, toString)

import RadixInt exposing (..)


type alias Senary =
    RadixInt


fromInt : Int -> Senary
fromInt =
    RadixInt.fromInt (Base 6)


toString : Senary -> String
toString s =
    RadixInt.toList s
        |> List.map (\d -> convertDigitToSenaryNotation d)
        |> List.reverse
        |> String.join ""

convertDigitToSenaryNotation: Int -> String
convertDigitToSenaryNotation d =
  String.fromInt d
```

Allowing you to work with a custom base like this:

```
Senary.fromInt 34
    |> Senary.toString -- "54"
```
