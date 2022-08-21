**DEPRECATED** this package was merged with [y0hy0h/ordered-containers](https://package.elm-lang.org/packages/y0hy0h/ordered-containers/latest/). For latest updates, please use that package instead.

# elm-ordered-dict

A dictionary mapping unique keys to values preserving insert order
 
 ``` elm
import OrderedDict exposing (OrderedDict, empty, insert, insertAt)
 
example : OrderedDict Int String 
example = empty
    |> insert 1 "one"
    |> insert 3 "three"
    |> insert 4 "four"
    |> insertAt 1 2 "two"
    
{-
    { order = [ 1, 2, 3, 4 ]
     , dict =
         Dict.fromList
             [ ( 1, "one" )
             , ( 2, "two" )
             , ( 3, "three" )
             , ( 4, "four" )
             ]
     }
-}
```
 
 
