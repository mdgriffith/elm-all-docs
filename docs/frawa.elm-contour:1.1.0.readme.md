# Contour

Calculate contour level lines for a two-dimensional scalar field,
based on the Marching Squares algorithm https://en.wikipedia.org/wiki/Marching_squares.

Given a function like
```elm
bilinear : (Float,Float) -> Float
bilinear (x,y) -> x * y
```

The library calculates a list of lines making up the contour for a given level like
```elm
    let
        grid =
            { min = ( 0, 0 ), max = ( 1, 1 ), steps = 40 }
    in
    countourLines 0.2 <| gridFunction grid bilinear
```

## Examples

Try examples at https://frawa.github.io/elm-contour/.


## Development

### Releasing

A reminder on how to release this package.

```
yarn elm bump
yarn elm publish
```