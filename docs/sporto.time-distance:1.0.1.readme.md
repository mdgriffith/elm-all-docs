# Time distance

[ ![Codeship Status for sporto/time-distance](https://app.codeship.com/projects/12cafa70-94a9-0136-c270-42599d9126df/status?branch=master)](https://app.codeship.com/projects/304697)

Return the distance between two times in words.

e.g.

- `less than 5 seconds`
- `about 1 month`
- `over 5 year`

This use the <https://package.elm-lang.org/packages/elm/time/latest/> package.

## Installation

```
elm install sporto/time-distance
```

## Usage

```
import Time
import Time.Distance as Distance

time1 = Time.fromMillis 1530403200000
time2 = Time.fromMillis 1530403205000

Distance.inWords time1 time2 == "less than 5 seconds"
```

More examples in the /test folder.

Heavily inspired by <https://github.com/alpacaaa/elm-date-distance>