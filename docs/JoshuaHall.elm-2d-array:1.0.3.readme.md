# elm-2d-array

Provides an ergonomic and fast way to use 2 dimensional arrays in Elm.

## Usage

### Creating a 2D array

```elm
import Array2D

my2dArray : Maybe (Array2D Int)
my2dArray =
    [ [ 1, 2, 3, 4 ]
    , [ 5, 6, 7, 8 ]
    , [ 9, 10, 11, 12 ]
    ]
        |> List.map Array.fromList
        |> Array.fromList
        |> Array2D.fromRows
```

### Getting an element

```elm
anElement : Maybe Int
anElement =
    Array2D.get 2 1 my2dArray -- (Just 10)
```

### Mapping over the 2D array

```elm
incremented : Array2D Int -> Array2D Int
incremented =
    Array2D.map (\elem -> elem + 1)


inverted : Array2D Bool -> Array2D Bool
inverted =
    Array2D.map not
```
