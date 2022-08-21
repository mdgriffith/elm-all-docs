# Elm-css-breakpoint

A set of standard non-configurable media queries for use with elm-css.

_All breakpoints use `min-width` and match `all` media types._

## Example

```elm
import Css.Breakpoint as Breakpoint


viewFooter =
    footer [ css styling.footer ] [ text "Hello World" ]


styling : { footer : List Style }
styling =
    { footer =
        [ width (pct 100)
        , color (hex "FFFFFF")
        , padding (Css.rem 1)
        , Breakpoint.small [ padding (Css.rem 2) ]
        ]
    }
```
