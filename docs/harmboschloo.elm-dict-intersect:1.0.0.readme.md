# Dict.Intersect

Provides intersections of multiple dictionaries based on their key.

## Example

```elm
import Dict exposing (Dict)
import Dict.Intersect


type alias Car =
    { wheels : Int
    }


type alias Boat =
    { speed : Float
    }


type alias Amphibian =
    { car : Car
    , boat : Boat
    }


cars : Dict Int Car
cars =
    Dict.fromList [ ( 0, Car 4 ), ( 1, Car 4 ), ( 2, Car 6 ) ]


boats : Dict Int Boat
boats =
    Dict.fromList [ ( 2, Boat 20 ), ( 3, Boat 30 ) ]


amphibians : List ( Int, Amphibian )
amphibians =
    Dict.Intersect.foldr2
        (\id car boat list -> ( id, Amphibian car boat ) :: list)
        []
        cars
        boats


-- amphibians == [ ( 2, { boat = { speed = 20 }, car = { wheels = 6 } } ) ]
```

## Note on performance

When folding over multiple dictionaries it is generally faster to have the smallest dictionary as the first argument and the one with the least amount of intersections next. See [these benchmarks](https://github.com/harmboschloo/elm-dict-intersect/blob/master/benchmarks/src/OrderPerformance.elm) for an example.
