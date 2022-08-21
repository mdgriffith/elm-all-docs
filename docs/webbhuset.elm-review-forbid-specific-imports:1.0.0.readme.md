# elm-review-forbid-specific-imports

Provides an [`elm-review`] rule to forbid modules in a specified namespace to
import modules from another specified namespace.

[`elm-review`]: https://package.elm-lang.org/packages/jfmengels/elm-review/latest/


## Provided rule

- [`ForbidSpecificImports`](ForbidSpecificImports)


## Example configuration

In this example we forbid modules in `App.Data` to import from `App.View`.

```elm
module ReviewConfig exposing (config)

import ForbidSpecificImports
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ ForbidSpecificImports.rule
        [ ( "App.Data"
          , [ "App.View" ]
          )
        ]
    ]
```
