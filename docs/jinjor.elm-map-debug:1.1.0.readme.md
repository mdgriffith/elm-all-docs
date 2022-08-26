elm-map-debug
====

Trying to reproduce Map.! problem.
You can test which types cause the problem.

See https://github.com/jinjor/elm-map-sscce for more details.

## Example

```elm
module Main exposing (main)

import Thing exposing (..)


main : Program () () (WrappedOpenBytes ())
main =
    Debug.todo ""
```

## By the way

I found that compiler claims this README is too short.

Is this enough? (3rd trial)
