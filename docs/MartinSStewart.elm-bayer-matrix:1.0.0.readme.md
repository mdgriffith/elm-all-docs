# Bayer Matrix

A package that calculates [bayer matrices](https://en.wikipedia.org/wiki/Ordered_dithering). This is useful if you want to create a dithering effect for a [WebGL shader](https://package.elm-lang.org/packages/elm-explorations/webgl/latest/).

## Example
```elm
import Array2D

matrix 1
--> Array2D.fromList
--> [ [ 0, 2 ]
--> , [ 3, 1 ]
--> ]

matrix 2
--> Array2D.fromList
--> [ [ 0, 8, 2, 10 ]
--> , [ 12, 4, 14, 6 ]
--> , [ 3, 11, 1, 9 ]
--> , [ 15, 7, 13, 5 ]
--> ]
```