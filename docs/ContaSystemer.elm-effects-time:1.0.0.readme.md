# Effects.Time

Time system effects to subscribe for time events.

It's an example usage of [Effects](https://package.elm-lang.org/packages/ContaSystemer/elm-effects/latest/) package.

## Usage

A system may subscribe for a time event with `every` function

```elm
module ChildSystemA exposing (Msg, timeEffects)

import Effects.Time
import Time


type Msg
    = Tick Time.Posix


timeEffects : Effects.Time.Effects Msg
timeEffects =
    Effects.Time.every 1000 Tick
```

```elm
module ChildSystemB exposing (Msg, timeEffects)

import Effects.Time
import Time


type Msg
    = Tick Time.Posix


timeEffects : Effects.Time.Effects Msg
timeEffects =
    Effects.Time.every 500 Tick
```

Another system may transform time effects into a subscribtion

```elm
module MainSystem exposing (timeSub)

import ChildSystemA
import ChildSystemB
import Effects
import Effects.Time


type Msg
    = ChildSystemAMsg ChildSystemA.Msg
    | ChildSystemBMsg ChildSystemB.Msg


timeSub : Sub Msg
timeSub =
    Effects.Time.subscription <|
        Effects.batch
            [ Effects.Time.map ChildSystemAMsg ChildSystemA.timeEffects
            , Effects.Time.map ChildSystemBMsg ChildSystemB.timeEffects
            ]

```

## Why not use `Time.every`?

In some situations it make sense to limit system subscriptions.
E.g. when one wants to make sure a system works only with Time and no other subscriptions used.