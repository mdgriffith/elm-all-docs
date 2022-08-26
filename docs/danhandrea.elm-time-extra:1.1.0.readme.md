# elm-time-extra

Extra functionality for Posix

All computations use `Time.utc`

## Creation

```elm
type alias Year =
    Int

type alias Day =
    Int

type alias Hour =
    Int

type alias Minute =
    Int

type alias Second =
    Int

type alias Millis =
    Int

epoch : Posix

fromY : Year -> Posix

fromYM : Year -> Month -> Posix

fromYMD : Year -> Month -> Day -> Posix

fromYMDH : Year -> Month -> Day -> Hour -> Posix

fromYMDHM : Year -> Month -> Day -> Hour -> Minute -> Posix

fromYMDHMS : Year -> Month -> Day -> Hour -> Minute -> Second -> Posix

fromYMDHMSM : Year -> Month -> Day -> Hour -> Minute -> Second -> Millis -> Posix
```
