# elm-review-rules

A collection of `elm-review` rules that we apply to all of our Elm code at carwow.

The rules included in this package are chosen to help us maintain a clean and tidy codebase, promote good patterns, and codify conventions that we think are important.

## Usage

Include the rules exposed by this package in the elm-review configuration for your project as follows:

```elm
module ReviewConfig exposing (config)

import CarwowReview
import Review.Rule exposing (Rule)


config : List Rule
config =
    CarwowReview.rules
```

## FAQ

**When should we add a new rule?**

The bar for adding a new rule should be high, as each new addition adds a burden for the maintainers and authors of projects using the package to ensure that all existing and future code is compliant. Before adding a new rule to this package, consider trialling it in one project and upstream it here if it proves useful.

The [elm-review README](https://github.com/jfmengels/elm-review/tree/master#when-to-write-or-enable-a-rule) has a useful guide to help decide when to write or enable a new rule.

**Can a rule be optional for certain modules or functions?**

The options that `elm-review` provides for opting out of specific rules are limited. If a rule requires an exception or cannot be applied universally, it is probably not a good fit for this package.

