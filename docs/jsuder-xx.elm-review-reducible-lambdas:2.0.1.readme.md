# elm-review-reducible-lambdas

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to detect reducible lambda expressions using different techniques.

## Provided rules

- [`NoEtaReducibleLambdas`](https://package.elm-lang.org/packages/jsuder-xx/elm-review-reducible-lambdas/1.0.0/NoEtaReducibleLambdas) - Reports when arguments can be removed
from a lambda through the process of Eta Reduction (part of the lambda calculus). For example, the following reductions are possible
  - `\x -> f x` reduces to `f`
  - `\x y -> f x y` reduces to `f`
  - `\x -> f a x` reduces to `f a`
  - `\a b -> f (g a) b` reduces to `\a -> f (g a)`

## Configuration

```elm
module ReviewConfig exposing (config)

import NoEtaReducibleLambdas
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoEtaReducibleLambdas.rule
        { lambdaReduceStrategy = NoEtaReducibleLambdas.AlwaysRemoveLambdaWhenPossible
        , argumentNamePredicate = always True
        }
    ]
```

## Try it out

You can try the example configuration above out by running the following command:

```bash
elm-review --template jsuder-xx/elm-review-reducible-lambdas/example
```
