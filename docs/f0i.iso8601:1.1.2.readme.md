# Iso8601

Format a [posix time](https://package.elm-lang.org/packages/elm/time/latest/) to a ISO8601 String.

This package is intended to format time stamps for user interfaces with custom precision.

## Install

```
elm install f0i/iso8601
```

## Examples

See [guide.elm-lang.org/…/time.html](https://guide.elm-lang.org/effects/time.html) for how to get the current time.


```elm
import Iso8601
import Time exposing (Posix)

...

-- get a Posix time from elm/time
time =
    Time.millisToPosix 1584875883199


-- this will format the time as "2020-03-22T11:18:03.199"
milli =
    Iso8601.toUtcMilliString time

-- this will format the time as "2020-03-22T11:18"
minute =
    Iso8601.toUtcString Iso8601.Minute time

-- this will format the time as "11:18:03"
hourToSecond =
    Iso8601.toUtcString Iso8601.HourSecond time

-- or get each part of the String as Tuple to create a custom format
custom =
    let
        ( ( year, month, day ), ( hour, minute, second ), ms ) =
            Iso8601.toTuple time
    in
    year ++ "/" ++ month ++ "/" ++ day ++ " " ++ hour ++ "_" ++ minute ++ "!"
```

A complete list of the helper functions can be found in the
[Iso8601 module docs](Iso8601).
