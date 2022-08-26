# elm-monoid

## Summary


UNMAINTAINED! Use https://package.elm-lang.org/packages/nikita-volkov/typeclasses/latest/


A module to define generic functions for monoid.  If you want your types be instances of the Monoid typeclass.  Although I'm still learning, monoids are like interfaces for types that can be 'mushed' together in some way.

For example lists and strings can be concated together and numbers can be added and multiplied together.

The common properties of Monoids are 

There exits a function that takes two parameters.
The parameters and the returned value have the same type.
There exists such a value that doesn't change other values when used with the binary function.

Here is some Haskell examples that show how monoids are a class of types with similar operations but executed differently per type

ghci> [1,2,3] `mappend` [4,5,6]  
[1,2,3,4,5,6]  
ghci> ("one" `mappend` "two") `mappend` "tree"  
"onetwotree"  
ghci> "one" `mappend` ("two" `mappend` "tree")  
"onetwotree"  
ghci> "one" `mappend` "two" `mappend` "tree"  
"onetwotree"  
ghci> "pang" `mappend` mempty  
"pang"  
ghci> mconcat [[1,2],[3,6],[9]]  
[1,2,3,6,9]  
ghci> mempty :: [a]  
[]  

See [documentation](http://learnyouahaskell.com/functors-applicative-functors-and-monoids#monoids)

## Details

Forked from [documentation](http://package.elm-lang.org/packages/arowM/elm-monoid/latest).
