# OnlyImportOutside

Enforces that certain module prefixes, e.g. `Data`, can only import modules from outside your codebase

### Base scenario

Any module in our codebase can import from `Data.*` modules in your codebase

```elm
module Page exposing (Page)

import Data.Animal
import Data.Thing.Gadget
```

But ideally, code written in `src/Data/**/*.elm` and `src/Data.elm` cannot import from other modules
in the codebase, including other `Data.*` modules (except if they are "parent-child" modules, e.g.
`Data.Animal` and `Data.Animal.Dog`)

# Quick trial

to check against your `src/Data` using [this rule](https://github.com/choonkeat/only-import-outside/blob/main/example/review/src/ReviewConfig.elm)

```
npx elm-review --template choonkeat/only-import-outside/example/review
```

if you're happy with that (or you don't have a `src/Data` to try against), then proceed below to install and setup

# Usage

First, setup [elm-review](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) if you haven't

```
npx elm-review init
```

Install this package inside `./review` sub directory

```
cd review
elm install choonkeat/only-import-outside
```

add a `OnlyImportOutside.rule` to your `config`

```elm
module ReviewConfig exposing (config)

import OnlyImportOutside
import Review.Rule exposing (Rule)


config : List Rule
config =
    [ OnlyImportOutside.rule
        { constrainedModulePrefixes = [ "Data" ]
        , allowedModulePrefixes = [ "Extra" ] -- for illustration only; you can leave it `[]`
        }
    ]
```

### Acceptable module imports

```elm
module Data.Animal.Dog exposing (Dog)

import Data.Animal
```

Acceptable since it's importing parent module (in terms of directory hierarchy)

```elm
module Data.Thing exposing (Thing)

import Data.Thing.Gadget
```

Acceptable since it's importing child module (in terms of directory hierarchy)

```elm
module Data.Thing exposing (Thing)

import Extra.Time
```

Acceptable since `Extra.Time` is allowed through `allowedModulePrefixes = [ "Extra" ]`

### Rejected module imports

```elm
module Data.Wrong exposing (Wrong)

import Data.Animal
import Data.Thing
import Page
```

will get rejected with these errors:

```
-- ELM-REVIEW ERROR ------------------------------------ src/Data/Wrong.elm:12:1

OnlyImportFromOutside: Cannot `import Data.Animal` from `module Data.Wrong`

12| import Data.Animal
    ^^^^^^^^^^^^^^^^^^
13| import Data.Thing



──────────────────────────────────────────────────────── src/Data/Wrong.elm:13:1

OnlyImportFromOutside: Cannot `import Data.Thing` from `module Data.Wrong`

12| import Data.Animal
13| import Data.Thing
    ^^^^^^^^^^^^^^^^^
14| import Page



──────────────────────────────────────────────────────── src/Data/Wrong.elm:14:1

OnlyImportFromOutside: Cannot `import Page` from `module Data.Wrong`

13| import Data.Thing
14| import Page
    ^^^^^^^^^^^



I found 3 errors in 1 file.
```