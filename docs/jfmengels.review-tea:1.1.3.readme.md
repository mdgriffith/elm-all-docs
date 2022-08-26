# DEPRECATED

This package was republished as [`jfmengels/elm-review-the-elm-architecture`](https://package.elm-lang.org/packages/jfmengels/elm-review-the-elm-architecture/latest/) in order to have a more consistent naming convention for `elm-review` rule packages.

To migrate, I recommend going to your review configuration and running the following commands:

```bash
# NOTE: You'll need to have Node.js installed to be able to use `npx`
npx elm-json uninstall jfmengels/review-tea --yes
npx elm-json install jfmengels/elm-review-the-elm-architecture --yes
```

# review-tea

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to improve your use of The Elm Architecture.


## Provided rules

- [`NoMissingSubscriptionsCall`](https://package.elm-lang.org/packages/jfmengels/review-tea/1.1.3/NoMissingSubscriptionsCall) - Reports likely missing calls to a `subscriptions` function.
- [`NoRecursiveUpdate`](https://package.elm-lang.org/packages/jfmengels/review-tea/1.1.3/NoRecursiveUpdate) - Reports recursive calls of an `update` function.
- [`NoUselessSubscriptions`](https://package.elm-lang.org/packages/jfmengels/review-tea/1.1.3/NoUselessSubscriptions) - Reports `subscriptions` functions that never return a subscription.


## Configuration

```elm
module ReviewConfig exposing (config)

import NoMissingSubscriptionsCall
import NoRecursiveUpdate
import NoUselessSubscriptions
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoMissingSubscriptionsCall.rule
    , NoRecursiveUpdate.rule
    , NoUselessSubscriptions.rule
    ]
```
