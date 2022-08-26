# elm-review-sorted

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to keep `case` patterns, record fields, and `type` constructors sorted.


## Provided rules

- [`NoUnsortedConstructors`](./src/NoUnsortedConstructors.elm) - Reports the use of unsorted `case` patterns and `type` constructors.
- [`NoUnsortedRecordFields`](./src/NoUnsortedRecordFields.elm) - Reports the use of unsorted record fields.


## Configuration

```elm
module ReviewConfig exposing (config)

import NoUnsortedRecordFields
import NoUnsortedConstructors
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoUnsortedConstructors.rule
    , NoUnsortedRecordFields.rule
    ]
```
