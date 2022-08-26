# elm-review-no-import-as

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to forbid the use of import aliases.


## Provided rules

- [`NoImportAs`](https://package.elm-lang.org/packages/fysiweb/elm-review-no-import-as/1.0.0/NoImportAs) - Reports the use of import aliases.


## Configuration

```elm
module ReviewConfig exposing (config)

import NoImportAs
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoImportAs.rule
    ]
```
