# NoLongImportLines

![.github/workflows/build.yml](https://github.com/r-k-b/no-long-import-lines/workflows/.github/workflows/build.yml/badge.svg)

A rule for elm-review that discourages keeping very long one-line `import`
statements.

Some Elm tools will change multi-line import statements back to a single line
when modifying the `exposing ()` section.

## Usage

After adding [`elm-review`][elm-review] to your project, import this rule from
your `ReviewConfig.elm` file and add it to the config. E.g.:

```elm
import NoLongImportLines
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoLongImportLines.rule ]
```

[elm-review]: https://package.elm-lang.org/packages/jfmengels/elm-review/latest/

## Roadmap

- [ ] Save users from users having to manually break up the line, by adding a [`fix`][fix]

[fix]: https://package.elm-lang.org/packages/jfmengels/elm-review/latest/Review-Fix
