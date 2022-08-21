# Time2

Yet another package to work with time that observes daylight saving time.

## Allow sending time zone through wire

We introduce this package because we want to transfer time zone back and forth between client and server.

Previously, in order to send time zone through the wire, we have to keep a separate copy of the data and only convert it
to `Time.Zone` at the very last step. We feel it would be convenient for us if we put that copy in a package.

## Observe daylight saving time

This package also tries to observes daylight saving time, see
[`Time2.toParts`](https://package.elm-lang.org/packages/pd9333/elm-time2/latest/Time2#toParts) and
[`Time2.fromParts`](https://package.elm-lang.org/packages/pd9333/elm-time2/latest/Time2#fromParts).
