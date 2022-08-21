# No String as Id

## What is it?

This is a simple rule for the [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) tool that will help flagging cases where Ids are represented as String. It is quite often the case that we see the following pattern in elm code:

```elm
type alias Stuff =
  { id: String,
  , ...
  }
```

However, this leads to many confusing calls on function dealing with both stuffs and things:

```elm
function: String -> String -> List String -> List Something -> SomethingElse
function stuffId thingId stuffs things =
  ...
```

Instead it would be much nicer to have something like this:

```elm
type StuffId =
  StuffId String

type ThingId =
  ThingId String

type alias Stuff =
  { id: StuffId
  , ...
  }


function: StuffId -> ThingId -> List StuffId -> List Something -> SomethingElse
function stuffId thingId stuffIds things =
  ...
```

Which makes it much harder to mess-up the arguments' order or to feed `SomethingId` instead of a `StuffId`...

## Why should you use it?

- if you are fed up of double checking that you're passing stuff in the right order
- if you are a fan of making impossible things impossible and make sure the compiler help you in case you change the argument order or the argument types

## Why should you not use it?

- if you do not like easy refactoring.
- if you do not care about `String` being used for something else that what they are.
- if you do not want to setup `elm-review`.
- ...

## Example configuration

```elm
import NoStringAsId
import Review.Rule exposing (Rule)

config : List Rule
config =
  [ NoStringAsId.rule
  ]
```
