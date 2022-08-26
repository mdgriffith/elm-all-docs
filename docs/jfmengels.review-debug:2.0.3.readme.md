# DEPRECATED

This package was republished as [`jfmengels/elm-review-debug`](https://package.elm-lang.org/packages/jfmengels/elm-review-debug/latest/) in order to have a more consistent naming convention for `elm-review` rule packages.

To migrate, I recommend going to your review configuration and running the following commands:

```bash
# NOTE: You'll need to have Node.js installed to be able to use `npx`
npx elm-json uninstall jfmengels/review-debug --yes
npx elm-json install jfmengels/elm-review-debug --yes
```

# review-debug

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to detect debug code.


## Provided rules

- [`NoDebug.Log`](https://package.elm-lang.org/packages/jfmengels/review-debug/2.0.3/NoDebug-Log) - Reports uses of [`Debug.Log`](https://package.elm-lang.org/packages/elm/core/latest/Debug#log).
- [`NoDebug.TodoOrToString`](https://package.elm-lang.org/packages/jfmengels/review-debug/2.0.3/NoDebug-TodoOrToString) - Reports uses of [`Debug.todo`](https://package.elm-lang.org/packages/elm/core/latest/Debug#todo) and [`Debug.toString`](https://package.elm-lang.org/packages/elm/core/latest/Debug#toString).


## Configuration

```elm
module ReviewConfig exposing (config)

import NoDebug.Log
import NoDebug.TodoOrToString
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoDebug.Log.rule
    , NoDebug.TodoOrToString.rule
    ]
```
