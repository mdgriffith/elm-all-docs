# Time.Extra

A set of helpers for working with the `Posix` data type from `elm/time`.

This library attempts to correct for daylight savings time, the one exception to
this is the `addDays` function which will not take into account the daylight
savings time since it doesn't know the timezone in which it is working. If
needed the `addDaysZ` function can be used which can account for it as the
timezone is passed in.

# Example

```elm
import Time
import Time.Extra as Time

example =
    (Time.epoch
        |> Time.addDays 1
        |> Time.toDateTuple Time.utc
    )
        == (1970,Jan,2)
```
