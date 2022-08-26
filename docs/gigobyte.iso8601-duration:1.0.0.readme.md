# iso8601-duration

This library converts between ISO-8601 duration strings as described [here](https://en.wikipedia.org/wiki/ISO_8601#Durations) and an easy-to-use data structure.

Both the basic (`PnYnMnDTnHnMnS`) and week (`PnW`) formats are supported.

The extended format (`P[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss]`) is not supported.

## Install

```
elm install gigobyte/iso8601-duration
```

## Example

```elm
import Iso8601.Duration as Duration

Duration.fromString "P3Y6M4DT12H30M5S"
-- Just
--     { years = 3
--     , months = 6
--     , days = 4
--     , hours = 12
--     , minutes = 30
--     , seconds = 5
--     }

Duration.fromString "P12W"
-- Just
--     { years = 0
--     , months = 0
--     , days = 84
--     , hours = 0
--     , minutes = 0
--     , seconds = 0
--     }
```
