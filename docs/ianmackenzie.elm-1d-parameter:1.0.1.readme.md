# elm-1d-parameter

`elm-1d-parameter` is an [Elm](http://elm-lang.org) package to help with
generating evenly spaced values such as (but not limited to) `Float`s,
[`Color`][3]s, [`Quantity`][1]s, or [`Point2d`][2]s.

The core idea is that there are many functions that let you interpolate between
two values based on a parameter value that ranges from 0 to 1; 0 gives you the
first value, 1 gives you the second value, 0.5 gives you a value half way in
between, etc. Some examples from [`elm-float-extra`][4], [`elm-color-extra`][7],
[`elm-units`][5] and [`elm-geometry`][6] that work this way:

```elm
Float.Extra.interpolateFrom :
    Float -- first value
    -> Float -- second value
    -> Float -- interpolation parameter
    -> Float

Color.Interpolate.interpolate :
    Space -- what color space to interpolate in (e.g. HSL)
    -> Color -- first color
    -> Color -- second color
    -> Float -- interpolation parameter
    -> Color

Quantity.interpolateFrom :
    Quantity Float units
    -> Quantity Float units
    -> Float
    -> Quantity Float units

Point2d.interpolateFrom :
    Point2d
    -> Point2d
    -> Float
    -> Point2d
```

Note that by partially applying the above functions, we can turn them all into
the form `Float -> a`:

```elm
-- Float -> Float
Float.Extra.interpolateFrom 5 10

-- Float -> Color
Color.Interpolate.interpolate
    Color.Interpolate.HSL
    Color.red
    Color.blue

-- Float -> Length
Quantity.interpolateFrom (meters 10) (meters 20)

-- Float -> Point2d
Point2d.interpolateFrom startPoint endPoint
```

The functions in this package all take a function of the form `Float -> a`,
evaluate it at a bunch of evenly-spaced parameter values between 0 and 1, and
return the results as a `List a` or `Array a`:

```elm
Parameter1d.steps 5 (Float.Extra.interpolateFrom 2 3)
--> [ 2, 2.2, 2.4, 2.6, 2.8, 3 ]
```

The results do not themselves have to be `Float`s:

```elm
Parameter1d.steps 10 <|
    Color.Interpolate.interpolate
        Color.Interpolate.HSL
        Color.red
        Color.blue
```

![HSL-interpolated colors](https://ianmackenzie.github.io/elm-1d-parameter/1.0.0/README/ColorInterpolationHSL.png)

```elm
Parameter1d.steps 10 <|
    Color.Interpolate.interpolate
        Color.Interpolate.RGB
        Color.red
        Color.blue
```

![RGB-interpolated colors](https://ianmackenzie.github.io/elm-1d-parameter/1.0.0/README/ColorInterpolationRGB.png)

```elm
Parameter1d.steps 20 <|
    Point2d.interpolateFrom
        (Point2d.fromCoordinates ( 20, 20 ))
        (Point2d.fromCoordinates ( 280, 130 ))
```

![Interpolated points](https://ianmackenzie.github.io/elm-1d-parameter/1.0.0/README/PointInterpolation.png)

Various different functions are provided that let you control what parameter
values get used (and therefore what values get returned):

```elm
import Float.Extra as Float

Parameter1d.steps 4 (Float.interpolateFrom 2 3)
--> [ 2, 2.25, 2.5, 2.75, 3 ]

Parameter1d.leading 4 (Float.interpolateFrom 2 3)
--> [ 2, 2.25, 2.5, 2.75 ]

Parameter1d.trailing 4 (Float.interpolateFrom 2 3)
--> [ 2.25, 2.5, 2.75, 3 ]

Parameter1d.inBetween 4 (Float.interpolateFrom 2 3)
--> [ 2.25, 2.5, 2.75 ]

Parameter1d.midpoints 4 (Float.interpolateFrom 2 3)
--> [ 2.125, 2.375, 2.625, 2.875 ]
```



Note that if you just want the actual parameter values, you can pass the
`identity` function as the last argument:

```elm
Parameter1d.steps 4 identity
--> [ 0, 0.25, 0.5, 0.75, 1 ]
```

## Why?

Instead of using this package and writing

```elm
Parameter1d.steps 1000 (Float.interpolateFrom 100 200)
```

you could use `List.range` and `List.map` to get the same result:

```elm
List.range 0 1000
    |> List.map
        (\i ->
            let
                parameterValue =
                    toFloat i / 1000
            in
            Float.interpolateFrom 100 200 parameterValue
        )
```

Alternatively, you could use [`List.Extra.initialize`][8]:

```elm
List.Extra.initialize 1001
    (\i ->
        let
            parameterValue =
                toFloat i / 1000
        in
        Float.interpolateFrom 100 200 parameterValue
    )
```

On my machine, using the built-in `List` functions is slowest on both Chrome and
Firefox; `List.Extra.initialize` is fastest in Firefox but `Parameter1d.steps`
is far, far faster in Chrome. Runs per second of the above code in both
browsers (more is better):

```
Method                | Chrome        | Firefox
----------------------|---------------|--------------
List.range/List.map   | 10,022        | 10,255
List.Extra.initialize | 16,976 (1.7x) | 26,689 (2.6x)
Parameter1d.steps     | 87,213 (8.7x) | 17,628 (1.7x)
```

The `Parameter1d.Array` functions are about the same in speed to calling
`Array.initialize` yourself (perhaps even slightly slower), but are still a
bit more convenient to use, for example

```elm
Parameter1d.Array.steps 4 (Float.interpolateFrom 100 200)
```

vs.

```elm
Array.initialize 5
    (\i -> Float.interpolateFrom 100 200 (toFloat i / 4))
```

[1]: https://package.elm-lang.org/packages/ianmackenzie/elm-units/latest/Quantity
[2]: https://package.elm-lang.org/packages/ianmackenzie/elm-geometry/latest/Point2d
[3]: https://package.elm-lang.org/packages/avh4/elm-color/latest/Color
[4]: https://package.elm-lang.org/packages/ianmackenzie/elm-float-extra/latest/Float-Extra#interpolateFrom
[5]: https://package.elm-lang.org/packages/ianmackenzie/elm-units/latest/Quantity#interpolateFrom
[6]: https://package.elm-lang.org/packages/ianmackenzie/elm-geometry/latest/Point2d#interpolateFrom
[7]: https://package.elm-lang.org/packages/noahzgordon/elm-color-extra/latest/Color-Interpolate#interpolate
[8]: https://package.elm-lang.org/packages/elm-community/list-extra/latest/List-Extra#initialize
