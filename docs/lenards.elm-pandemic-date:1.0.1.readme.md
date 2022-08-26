# elm-pandemic-date
When you feel like time stopped and we're still in March 2020 ...

## Background

Inspired by [a tweet](https://twitter.com/andreagoulet/status/1481337118312087552) from [Andrea Goulet](https://twitter.com/andreagoulet).

## Usage

```elm
import Time exposing (Month(..))
import Date exposing (Unit(..))
import PandemicDate

PandemicDate.toPandemicDate (Date.fromCalendarDate 2022 Jan 13)
```

## REPL Example

```elm
> elm repl
---- Elm 0.19.1 ----------------------------------------------------------------
Say :help for help and :exit to exit! More at <https://elm-lang.org/0.19.1/repl>
--------------------------------------------------------------------------------
> import Time exposing (Month(..))
> import Date exposing (Unit(..))
> import PandemicDate
> PandemicDate.toPandemicDate (Date.fromCalendarDate 2022 Jan 13)
"March 683th, 2020" : String
```