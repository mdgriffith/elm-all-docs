# elm-for

## Brief introduction

This package provides `for` function like that in other languages.

A function `f` will repeat several times. It can receive the index in the `for` function so that every time `f` is repeated, it can output different values.

## Example

```elm
    For.for
        0
        10
        (\i ( list, added ) ->
            ( (i
                + added
              )
                :: list
            , added
            )
        )
        ( []
        , 10
        )
        == ( [ 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10 ], 10 )
```
