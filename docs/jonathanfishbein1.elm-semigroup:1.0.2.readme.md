# elm-semigroup

## Summary


UNMAINTAINED! Use https://package.elm-lang.org/packages/nikita-volkov/typeclasses/latest/


A module to define generic functions for semigroup.  If you want your types be instances of the SemiGroup typeclass.  Although I'm still learning, semigroups are like interfaces for types that can be 'mushed' together in some way.

For example lists and strings can be concated together and numbers can be added and multiplied together.

The common properties of SemiGroups are 

There exits a function that takes two parameters.
The parameters and the returned value have the same type.

Here is some Haskell examples that show how semigroups are a class of types with similar operations but executed differently per type

ghci> [1,2,3] `mappend` [4,5,6]  
[1,2,3,4,5,6]  
ghci> ("one" `mappend` "two") `mappend` "tree"  
"onetwotree"  
ghci> "one" `mappend` ("two" `mappend` "tree")  
"onetwotree"  
ghci> "one" `mappend` "two" `mappend` "tree"  
"onetwotree"  
"pang"  
ghci> mconcat [[1,2],[3,6],[9]]  
[1,2,3,6,9]  
