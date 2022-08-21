# Pair

A Product Type that allows you to hold and use two values in one type. This useful for working with more than one related value similar to tuple or list, but since it is limited to only two values the API is more focused.

There are many uses for the Pair type and, if you know of a good one that is not below please add a PR. I use the Pair type primarily for computations on values that have "metadata" or some extra information about the value that needs to travel with it.

```elm
import Pair


-- A math example

average : List Float -> Float
average list =
  list
    |> Pair.branchWith List.sum List.length
    |> Pair.merge (/)


average [ 9, 11, 34 ] -- > 18


-- More complex example.

type alias Item =
  { name : String
  , cost : Float
  }


sumCart : List Items -> Float
sumCart items =
  List.foldl (\acc { price } -> total + price ) 0 items


calculateCart : List Items -> Pair (List Items) Float
calculateCart items =
    branch items
      |> Pair.map sumCart


calculateCart
  [ { name = "Apple", price = 0.75 }
  , { name = "Banana", price = 0.53 }
  , { name = "Tangerine", price = 0.98 }
  ]

{- > Pair
        [ { name = "Apple", price = 0.75 }
        , { name = "Banana", price = 0.53 }
        , { name = "Tangerine", price = 0.98 }
        ]
        2.26

-}

```
