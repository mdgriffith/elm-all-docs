# elm-utc-date-string

Convert [UTC date strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString#Description) into [POSIX times](https://package.elm-lang.org/packages/elm/time/latest/Time#Posix).

This package is a fork of [rtfeldman/elm-iso8601-date-strings](https://github.com/rtfeldman/elm-iso8601-date-strings). Most of the code is Richard's, as is most of the README below. I
adapted Richard's code because Firebase's API uses UTC strings everywhere instead of POSIX
or ISO-8601 strings.

This package takes the view that it is a mistake to use UTC date strings as a
data transfer format. Nevertheless, third-party endpoints may use them,
so even if we'd rather avoid them, sometimes they may be unavoidable.

The only design goal of this package is to "correct the mistake" by translating
UTC date strings to and from `Time.Posix` values. Because UTC strings do not have
offsets, the resulting `Time.Posix` value is already in UTC.

That's all this package does, and all it aims to do!

## Why are integers better?

Integer milliseconds since the epoch is a better choice for data transfer because
UTC date strings are much larger to transfer than integers and harder to run
calculations on. The usual argument in favor of date strings is that they
are more human-readable than integers, but making data readable for humans is
a better job for developer tools than data transfer formats between machines.
