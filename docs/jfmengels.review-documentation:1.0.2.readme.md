# DEPRECATED

This package was republished as [`jfmengels/elm-review-documentation`](https://package.elm-lang.org/packages/jfmengels/elm-review-documentation/latest/) in order to have a more consistent naming convention for `elm-review` rule packages.

To migrate, I recommend going to your review configuration and running the following commands:

```bash
# NOTE: You'll need to have Node.js installed to be able to use `npx`
npx elm-json uninstall jfmengels/review-documentation --yes
npx elm-json install jfmengels/elm-review-documentation --yes
```

# review-documentation

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to help with the quality and correctness of your Elm project's documentation.


## Provided rules

- [`Documentation.ReadmeLinksPointToCurrentVersion`](https://package.elm-lang.org/packages/jfmengels/review-documentation/1.0.2/Documentation-ReadmeLinksPointToCurrentVersion) - Reports links in the `README.md` that do not point to the current version of the package.

## Configuration

```elm
module ReviewConfig exposing (config)

import Review.Rule exposing (Rule)
import Documentation.ReadmeLinksPointToCurrentVersion

config : List Rule
config =
    [ Documentation.ReadmeLinksPointToCurrentVersion.rule
    ]
```
