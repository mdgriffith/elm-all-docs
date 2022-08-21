# elm-conditional

This Library contains a set of functions that are intended to simplify the
application of pipes when conditions are required. Instead of using multiple
if-else-statements, it is possible to pass the condition as the first parameter,
which defines if a functions gets executed or not.

Functions that have an `If` attached to their name, allow to define conditions
for  their applications. If the function-name ends with a `When`, then the
application of the passed function is based on a Maybe type and only gets
executed, if this parameter is not equal to Nothing.

``` elm
import Conditional as C

...
  let
    list = [1,2,3,4,5,6,7,8,9]
  in
  -- apply a function only if the first condition is met
  list
    |> C.apply2If (++) (List.length list > 5) 5
    |> (==) [5,1,2,3,4,5,6,7,8,9]

  -- apply a function only if the first parameter is not Nothing
  list
    |> C.apply2When (++) (Just 1000)
    |> (==) [1000,1,2,3,4,5,6,7,8,9]

```

The sub-modules contain a couple of functions that already abstract List or
String manipulation. So that you can also apply these functions directly without
any further if-else-statements.


``` elm
import Conditional.List as CList

...
  let
    list = [1,2,3,4,5,6,7,8,9]
  in
  list
    |> CList.mapIf (List.length list > 5) (\v -> v * v)
    |> CList.addIf (List.member 6 list) -99
    |> CList.attachIf (List.member 7 list) 99
    |> (==) [-99, 1, 4, 9, 16, 25, 36, 49, 62, 91, 99]

...
```
