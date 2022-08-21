# elm-inflect

Convert nouns to their plural and singular forms attempting to preserve case,
and adjectives.

## Examples

```elm

toPlural "potato" == "potatoes"
toPlural "The Illustrated Man" == "The Illustrated Men"
toPlural "SHOUT" == "SHOUTS"
toPlural "foo_bar" == "foo_bars"

toSingular "potatoes" == "potato"
toSingular "The Illustrated Men" == "The Illustrated Man"
toSingular "SHOUTS" == "SHOUT"
tosingular "foo_bars"  == "foo_bar"

```

PRs and bug reports:

https//github.com/maca/elm-inflect
