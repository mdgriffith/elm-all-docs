#  elm-modular-scale
Create proportionally related values to be used as font sizes, element widths, line height, ect.

[example live](https://rl-king.github.io/elm-modular-scale-example/) |
[example code](https://github.com/rl-king/elm-modular-scale-example)

Based on the idea found at [modularscale.com](http://www.modularscale.com/)

## Usage
```elm
config : Config
config =
    config [ 1 ] PerfectFifth

get config 5

--> 7.59375

ms : Int -> String
ms x =
    String.fromFloat (get config x) ++ "em"

h1 [ style [ ( "font-size", ms 4 ) ] ] [ text "Foo" ]

-- Or, if you're using elm-css

ms : Int -> Css.Rem
ms x =
    rem (get config x)

style : List Style
style =
    [ fontSize (ms 4) ]
```

Also check out [this](https://vimeo.com/17079380) great talk by Tim Brown, introducing this concept.
