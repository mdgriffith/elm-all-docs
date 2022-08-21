# elm-review-record-alias-constructor

[elm-review](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rule: forbid record `type alias` constructors.
Read more about the why in [`no-record-type-alias-constructor-function`](https://dark.elm.dmy.fr/packages/lue-bird/elm-no-record-type-alias-constructor-function/latest/).


  - 🔧[`NoRecordAliasConstructor`](#NoRecordAliasConstructor): detect & fix constructor usages
  - 🔧[`NoRecordAliasWithConstructor`](#NoRecordAliasWithConstructor): detect record aliases that have a constructor & fix by using [`RecordWithoutConstructorFunction`](https://dark.elm.dmy.fr/packages/lue-bird/elm-no-record-type-alias-constructor-function/latest/)

# [`NoRecordAliasConstructor`](NoRecordAliasConstructor)

In contrast to [lxierita's no-typealias-constructor-call](lxierita/no-typealias-constructor-call), this rule also reports constructors that aren't called (for example in `Json.Decode.mapN` functions). [↑ all differences](#comparison-to-no-typealias-constructor-call)

## examples

```elm
type alias User =
    { name : String, age : Int }
```

```elm
User "Balsa" 42
```
will be marked as error and automatically fixed:
```elm
{ name = "Balsa", age = 42 }
```

The same goes for cases where no arguments are applied:
```elm
map2 User
    (field "name" string)
    (field "age" int)
```
fixed
```elm
map2 (\name age -> { name = name, age = age })
    (field "name" string)
    (field "age" int)
```

[Skip to "try it out"](#try-it-out)

## comparison to no-typealias-constructor-call

[lxierita/no-typealias-constructor-call](lxierita/no-typealias-constructor-call)...
  - ..only reports record alias constructors that are called directly
    ```elm
    (User <| "Ann") <| 18
    (identity User) "Bill" 42
    User |> (\user -> user "Cem" 66)
    ```
    aren't reported for example
  - ..doesn't provide automatic fixes → refactoring is inconvenient
  - ..only looks for type aliases in the same module. This package finds _every used record alias_

# [`NoRecordAliasWithConstructor`](NoRecordAliasWithConstructor)

## examples

```elm
type alias User =
    { name : String, age : Int }
```
will be marked as error and automatically fixed:
```elm
import RecordWithoutConstructorFunction exposing (RecordWithoutConstructorFunction)

type alias User =
    RecordWithoutConstructorFunction
        { name : String, age : Int }
```

disallowing constructor functions from being created.

# try it out

```noformattingples
elm-review --template lue-bird/elm-record-alias-constructor/example
```

## use it

After adding [elm-review](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) to your project, import this rule from
your `ReviewConfig.elm` file and add it to the config. E.g.:

```elm
import NoRecordAliasConstructor
import NoRecordAliasWithConstructor
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoRecordAliasConstructor.rule
    , NoRecordAliasWithConstructor.rule
    ]

```

[lxierita/no-typealias-constructor-call]: https://package.elm-lang.org/packages/lxierita/no-typealias-constructor-call/latest/
