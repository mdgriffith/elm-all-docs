# review-no-regex

Provides [elm-review][elm-review] rule to favor `Parser` package instead of `Regex` package.

[Regex] package provides good reasoning on why it's better to use [Parser] package.

## Usage

After adding [elm-review][elm-review] to your project, import this rule to `ReviewConfig.elm` file and add it to the config.

## Example configuration

```elm
import NoRegex
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoRegex.rule ]
```


[elm-review]: https://package.elm-lang.org/packages/jfmengels/elm-review/latest/
[Regex]: https://package.elm-lang.org/packages/elm/regex/latest/
[Parser]: https://package.elm-lang.org/packages/elm/parser/latest/