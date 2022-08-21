> one type for emptiable and safe non-empty

# [emptiness typed](https://package.elm-lang.org/packages/lue-bird/elm-emptiness-typed/latest/)

**_🧩 Read about [allowable state](https://package.elm-lang.org/packages/lue-bird/elm-allowable-state/latest/) first_**

## 📦 [`Emptiable`](Emptiable) `.....  Never |` [`Possibly`](https://dark.elm.dmy.fr/packages/lue-bird/elm-allowable-state/latest/Possibly)

A `Maybe` value that can be made non-empty depending on what we know – an "emptiable-able" value

```elm
import Emptiable exposing (Emptiable, filled, fill, fillMap)

type TextFilled
    = TextFilled Char String

first : Emptiable TextFilled Never -> Char
first =
    fill >> \(TextFilled firstChar _) -> firstChar

maybeFirst :
    Emptiable TextFilled possiblyOrNever
    -> Emptiable Char possiblyOrNever
maybeFirst =
    fillMap (filled >> first)
```

## 📚 [`Stack`](Stack)

Handle lists that are [`Possibly`](https://dark.elm.dmy.fr/packages/lue-bird/elm-allowable-state/latest/Possibly) or `Never` [`Emptiable`](Emptiable#Emptiable) in one go.

`Emptiable ... Never` allows safe `Maybe`-free [`top`](Stack#top), [`topRemove`](Stack#topRemove), [`fold`](Stack#fold) (for finding the maximum etc.; some call it "fold1"), ...

```elm
import Emptiable exposing (Emptiable)
import Stack exposing (Stacked, topDown, onTopStack, onTopLay, toTopDown)

Emptiable.empty
        --: Emptiable (Stacked element_) Possibly
    |> onTopLay 0
        --: Emptiable (Stacked number_) never_
    |> onTopStack (topDown 1 [ 2, 3 ])
        --: Emptiable (Stacked number_) never_
    |> toTopDown
--> ( 1, [ 2, 3, 0 ] )
```

## 📜 [`Scroll`](Scroll)

Items rolled up on both sides of a focus

→ good fit for dynamic choice selection: tabs, playlist, ...
[↑ examples](https://github.com/lue-bird/elm-emptiness-typed/tree/master/examples)

`Scroll` can even focus a gap [`Down` or `Up`](https://dark.elm.dmy.fr/packages/lue-bird/elm-linear-direction/latest/) from every item.


```elm
import Linear exposing (DirectionLinear(..))
import Emptiable exposing (filled)
import Stack exposing (topDown)
import Scroll exposing (Scroll, FocusGap)

Scroll.empty
        --: Scroll item_ FocusGap Possibly
    |> Scroll.focusAlter (\_ -> -1 |> filled)
        --: Scroll number_ FocusGap never_
    |> Scroll.sideAlter
        ( Up, \_ -> topDown 1 [ 2, 3 ] )
        --: Scroll number_ FocusGap never_
    |> Scroll.toGap Up
        --: Scroll number_ FocusGap Possibly
    |> Scroll.focusAlter (\_ -> 0 |> filled)
        --: Scroll number_ FocusGap never_
    |> Scroll.toStack
--> topDown -1 [ 0, 1, 2, 3 ]
```

## suggestions?

→ See [contributing.md](https://github.com/lue-bird/elm-emptiness-typed/blob/master/contributing.md)

## you like type-safety?

[typesafe-array](https://dark.elm.dmy.fr/packages/lue-bird/elm-typesafe-array/latest/) takes it to the extreme.
The possible length range is part of its type, allowing safe access for some elements.
