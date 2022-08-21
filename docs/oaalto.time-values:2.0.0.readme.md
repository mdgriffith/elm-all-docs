Extract time values from numbers.
```elm
import Time.Values as TimeValues exposing (TimeValues)

values = TimeValues.fromSeconds 60

minutes = values.minutes
```

The functions fromMilliseconds, fromSeconds and fromMinutes split the given
value into its compound elements, namely: ms, secs, mins, hours, days, weeks,
months and years.
