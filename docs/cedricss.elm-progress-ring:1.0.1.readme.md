# Progress ring with elm/svg

### Insert a static ring

Add a progress ring to an Html view:

```elm
import Progress.Ring

ringView : Html msg
ringView =
    Progress.Ring.view
        { color = "#6c45bc"
        , progress = 0.75
        , stroke = 8
        , radius = 30
        }
```

Here is the result:

<img src="https://github.com/cedricss/elm-progress-ring/blob/master/img/ring-example.png?raw=true" width="72"/>

### Integrate with elm-css

If you are working with elm-css, convert it to styled html with `Html.Styled.fromUnstyled`.

### Animate with plain css

Use `Progress.Ring.circumference config` to retrieve the circumference of the ring at 100% progress. Use it at an initial offset:

Main.elm

```elm
ringView : Html msg
ringView =
    let
        progressRingConfig =
            { color = "#6c45bc"
            , progress = 0
            , stroke = 8
            , radius = 30
            }

        ringCircumference =
            Progress.Ring.circumference progressRingConfig
    in
    div
        [ attribute
            "style"
            ("--ring-circumference: " ++ String.fromFloat ringCircumference)
        ]
        [ Progress.Ring.view progressRingConfig ]
```

style.css

```css
@keyframes ringProgress {
  from {
    stroke-dashoffset: var(--ring-circumference);
  }
  to {
    stroke-dashoffset: 0;
  }
}

svg circle {
  animation: ringProgress linear 4s;
}
```

### Animate with elm-css

TODO

### Animate with Elm Animator

TODO

## Author

Cédric Soulas ([cedricsoulas.com/elm](https://cedricsoulas.com/elm))

## License

MIT
