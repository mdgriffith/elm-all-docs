# OneToOne

A data structure for one-to-one mapping between values. A 'OneToOne' is essentially
a [bijection](https://en.wikipedia.org/wiki/Bijection) between subsets of
its two argument types.

Every `first` value is associated with exactly one `second` value and vice versa.
Compare this to a [Dict](https://package.elm-lang.org/packages/elm/core/latest/Dict)
, where every key is associated with exactly one value, but a value can be associated
with more than one key.

Internally, a `OneToOne` one is composed of two dictionaries, one for the first-to-second direction 
and one for second-to-first. As such, insert, remove, and query operations all 
have the same big-O performance as dictionaries.



```elm

import OneToOne exposing (OneToOne)

myOneToOne : OneToOne String Int
myOneToOne =
    OneToOne.empty
        |> OneToOne.insert "potato" 100
        |> OneToOne.insert "cabbage" 200
        |> OneToOne.insert "tomato" 300
        |> OneToOne.insert "tomato" 100

OneToOne.toList myOneToOne 
--> [ ( "cabbage", 200 ), ( "tomato", 100 ) ] 


```

## Tests

This package uses
[elm-test](https://github.com/elm-explorations/test) and 
[elm-verify-examples](https://github.com/stoeffel/elm-verify-examples)
