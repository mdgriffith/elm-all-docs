# Elm CSS Resets

Some handy resets converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

## Install

```
elm install BrianHicks/elm-css-reset
```

## Use

```elm
import Css.Reset as Reset
import Html.Styled as Html exposing (Html)


view : Model -> Html Msg
view _ =
    [ Reset.meyerV2
    , Reset.borderBoxV201408
      -- your application view stuff here
    ]
```

## Upgrades and Compatibility Policy

Each reset is versioned according to the date it's original creator published it (e.g. `Css.Reset.meyerV2` corresponds to the [Eric Meyer CSS Reset, version 2]().)
The Elm definitions of these resets will only change if they're out of sync with the original CSS as linked in the docs.

If you find that the rules produced by this library do not produce the same styles as using the equivalent CSS reset, please open a bug.

## Climate Action

I want my open-source activities to support projects addressing the climate crisis (for example, projects in clean energy, public transit, reforestation, or sustainable agriculture.)
If you are working on such a project, and find a bug or missing feature in any of my libraries, **please let me know and I will treat your issue as high priority.**
I'd also be happy to support such projects in other ways.
In particular, I've worked with Elm for a long time and would be happy to advise on your implementation.

## License

This package is licensed under the BSD 3-Clause license, located at `LICENSE` in the source.
