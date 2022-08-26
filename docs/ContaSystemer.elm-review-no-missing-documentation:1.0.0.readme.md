# review-no-missing-documentation

Provides [elm-review][elm-review] rule enforce documentation for every top-level declaration.

## Usage

After adding [elm-review][elm-review] to your project, import this rule to `ReviewConfig.elm` file and add it to the config.

## Example configuration

```elm
import NoMissingDocumentation
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoMissingDocumentation.rule ]
```


[elm-review]: https://package.elm-lang.org/packages/jfmengels/elm-review/latest/