# Triple

This is a library with helper methods for Types like `(a, b, c)`.

This allows a similar kind of manipulation like the `Tuple` in `elm/core`.

## Examples

```elm

import Triple exposing (Triple)

-- simpler type declaration
func1 : Triple Int String Bool
func2 : (Int, String, Bool)

-- short hand construction:
shortConstruction = (1, 2, 3) == Triple.triple 1 2 3

-- adding new components to the triple
addComponents = (1, 2, 3) ==
    ( Triple.insertThird 3
        <| Tuple.pair 1 2
    )

-- getting components of the triple
getComponents = 2 == Triple.second (1, 2, 3)

-- drop components of the triple
dropComponent = (1, 3) == Triple.dropSecond (1, 2, 3)

-- map components of the triple
mapComponent = (1, 12, 3) == Triple.mapSecond ((+) 10) (1, 2, 3)

-- map all components of the triple
mapAllComponents = (11, 22, 33) ==
    Triple.mapAll
        ((+) 10)
        ((+) 20)
        ((+) 30)
        (1, 2, 3)

```
