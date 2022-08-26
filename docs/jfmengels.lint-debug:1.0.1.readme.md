# DEPRECATION NOTICE

`elm-lint` has been deprecated in favor of [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/).
To work with `elm-review`, this package has been republished under the name [`review-debug`](https://package.elm-lang.org/packages/jfmengels/review-debug/latest/).

# lint-debug

Provides [`elm-lint`](https://package.elm-lang.org/packages/jfmengels/elm-lint/latest/) rules to detect debug code.


## Provided rules

- [`NoDebug`](./NoDebug) - Reports uses or imports of the [`Debug` module](https://package.elm-lang.org/packages/elm/core/latest/Debug).


## Configuration

```elm
module LintConfig exposing (config)

import Lint.Rule exposing (Rule)
import NoDebug

config : List Rule
config =
    [ NoDebug.rule
    ]
```
