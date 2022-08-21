## [linear direction](https://dark.elm.dmy.fr/packages/lue-bird/elm-linear-direction/latest/)

Q: Can direction be better expressed than in

  - `foldr`, `foldl`: does `foldr` mean fold right? A quite unclear name
  - no `Array.getr/l`, `setr/l` but `foldr`, `foldl`?
  - negative indices
      - `Array.slice 0 -1` is handy! But you can't do `slice 2 -0`
      - many operations support negative indices, but others don't
      - not explicit → can have unintended side-effects

A: Use the **direction as an argument**:

```elm
import Linear exposing (DirectionLinear(..))
import List.Linear
import Array exposing (Array)
import Array.Linear

[ 'l', 'i', 'v', 'e' ]
    |> List.Linear.foldFrom ( "", Up, String.cons )
--> "evil"

[ 'l', 'i', 'v', 'e' ]
    |> List.Linear.foldFrom ( "", Down, String.cons )
--> "live"

Array.fromList [ 'e', 'v', 'i', 'l' ]
    |> Array.Linear.element ( Down, 0 )
--> Ok 'l'
```

  - → a less cluttered API, e.g.
      - `foldFrom` instead of `foldr`, `foldl`
      - `toChunks` instead of [`chunksFromLeft`/-`Right`](https://package.elm-lang.org/packages/elm-community/list-split/latest/List-Split)

  - → deal with both directions at once

    ```elm
    import Linear exposing (DirectionLinear)
    import Array exposing (Array)
    import Array.Linear

    alter :
        ( ( DirectionLinear, Int ), element -> element )
        -> Array element
        -> Array element
    alter ( location, alter ) =
        \array ->
            array
                |> Array.Linear.elementReplace
                    ( location
                    , \() ->
                        array
                            |> Array.Linear.element location
                            |> alter
                    )
    ```

  - → direction is always explicit

## `Order`

Build `compare` operations for basic types, records, `type` unions.
All without `comparable`, `number`, ...

```elm
import Order exposing (Ordering)

type User
    = User
        { firstName : String
        , lastName : String
        , age : Int
        }

userOrder : Ordering User
userOrder =
    Order.by
        ( \(User user) -> user
        , Order.downOnTie
            [ Order.by ( .lastName, Order.string )
            , Order.by ( .firstName, Order.string )
            , Order.by ( .age, Order.int )
            ]
        )

[ User { firstName = "Andy", lastName = "Baldwin", age = 90 }
, User { firstName = "Bert", lastName = "Anderson", age = 23 }
, User { firstName = "Alec", lastName = "Anderson", age = 8 }
, User { firstName = "Alec", lastName = "Anderson", age = 100 }
]
    |> List.sortWith userOrder
--> [ { firstName = "Alec", lastName = "Anderson", age = 8 }
--> , { firstName = "Alec", lastName = "Anderson", age = 100 }
--> , { firstName = "Bert", lastName = "Anderson", age = 23 }
--> , { firstName = "Andy", lastName = "Baldwin", age = 90 }
--> ]
```

[↑ other examples](https://github.com/lue-bird/elm-linear-direction/blob/master/example/src/Card.elm)

## where `linear direction` is already being used

  - [`emptiness-typed`](https://dark.elm.dmy.fr/packages/lue-bird/elm-emptiness-typed/latest/)
  - [`typesafe-array`](https://dark.elm.dmy.fr/packages/lue-bird/elm-typesafe-array/latest/)
  - [`rosetree-path`](https://dark.elm.dmy.fr/packages/lue-bird/elm-rosetree-path/latest/)

## suggestions?

→ [contribute](https://github.com/lue-bird/elm-linear-direction/blob/master/contributing.md)
