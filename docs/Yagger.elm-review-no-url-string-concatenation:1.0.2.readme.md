# elm-review-no-url-string-concatenation

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rule to ensure URLs are not build using string concatenation, and suggests using Url.Builder package instead.


## Provided rules

- [`NoUrlStringConcatenation`](https://package.elm-lang.org/packages/Yagger/elm-review-no-url-string-concatenation/1.0.2/NoUrlStringConcatenation/)


## Configuration

```elm
module ReviewConfig exposing (config)

import NoUrlStringConcatenation
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoUrlStringConcatenation.rule
    ]
```


## Try it out

You can try the example configuration above out by running the following command:

```bash
elm-review --template Yagger/elm-review-no-url-string-concatenation/example
```
