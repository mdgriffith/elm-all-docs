> **Use [Docs.ReviewLinksAndSections from jfmengels/elm-review-documentation](https://dark.elm.dmy.fr/packages/jfmengels/elm-review-documentation/latest/Docs-ReviewLinksAndSections) instead! It has more options, notices sections etc.**

# elm-review-links-point-to-existing-package-members

[`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to check your links:

- `[Module.Special](Module-Special)`,
- `[Module.Special.definition](Module-Special#definition)` or
- `[Module.definition](#definition)`

Reports if the linked module or definition doesn't exists in the package.


## Provided rules

- [`LinksPointToExistingPackageMembers`](LinksPointToExistingPackageMembers) - Reports links to nonexistent package definitions or modules.


## Configuration

```elm
module ReviewConfig exposing (config)

import LinksPointToExistingPackageMembers
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ LinksPointToExistingPackageMembers.rule
    ]
```


## Try it out

You can try the example configuration above out by running the following command:

```bash
elm-review --template lue-bird/elm-review-links-point-to-existing-package-members/example
```
