# Internet Time

[Internet Time](https://en.wikipedia.org/wiki/Swatch_Internet_Time) was an alternative time keeping system introduced in 1998, with the (somewhat debatable but admirable) purpose of making it easy for people to synchronise online activities.

It's a decimal time system where a day is split into 1000 'beats', starting at @000 and ending at @999 (Internet Time is presented with an '@' at the beginning). The timezone is permanently at UTC+1, so the time is the same around the world.

It was used in a few places, most notably as Phantasy Star Online, but it didn't take off and became a footnote in history of one of those weird Y2K internet things.

This module that lets you use Internet Time in Elm, should that be a thing you want to do.

I made this package because I was starting out in Elm and it seemed like a fun way to get started with package design.

---

Find out the Internet Time from a Posix Time:
``` 
    oneTime = Time.millisToPosix 1525244393059
    anotherTime = Time.millisToPosix 1525221281000

    InternetTime.fromPosix oneTime -- 333
    InternetTime.fromPosix anotherTime -- 65

    InternetTime.displayFromPosix oneTime -- "333"
    InternetTime.displayFromPosix anotherTime -- "065"
```

Convert milliseconds into beats:

```
    millisToBeats 1380000 -- 23 minutes = 15.972222 beats

```

Use the cadence of internet time in your application:

```
    subscriptions : Model -> Sub Msg
    subscriptions model =
        Time.every centibeat Tick
```
