# NoFloatIds

![.github/workflows/build.yml](https://github.com/r-k-b/no-float-ids/workflows/.github/workflows/build.yml/badge.svg)

A rule for elm-review that discourages the use of Float types for "Id"
properties.

Not expected to be widely applicable; our use case is fairly niche, and
relates to legacy software.

In the rare situation that generated Elm code isn't of the highest quality,
the `NoFloatIds` rule will help to enforce record properties that look like IDs
from being assigned `Float` types.

For example, the following two Record type definitions would be marked as
Errors:

```elm
type alias Foo =
    { qux : Qux
    , someId : Float
    }

type alias Bar =
    { qux : Qux
    , id : Float
    }
```

## Usage

After adding [`elm-review`][elm-review] to your project, import this rule from
your `ReviewConfig.elm` file and add it to the config. E.g.:

```elm
import NoFloatIds
import Review.Rule exposing (Rule)


config : List Rule
config =
    [ NoFloatIds.rule ]
```

[elm-review]: https://package.elm-lang.org/packages/jfmengels/elm-review/latest/
