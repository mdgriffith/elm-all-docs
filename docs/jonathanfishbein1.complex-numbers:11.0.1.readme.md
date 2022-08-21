# Complex Numbers

## Summary

UNMAINTAINED! Use <https://package.elm-lang.org/packages/jonathanfishbein1/elm-numbers/latest/>

A module to define complex numbers and basic arithmetic operations on them.

I accidently published this package *before* checking to see if there already existed an Elm package for complex numbers.  This was a rookie mistake I made when getting started developing Elm packages.

However, this package does contain some functionality that differs from the two other Elm complex number packages.  Most notably this package makes use of [jonathanfishbein1/numeric-typeclasses](https://package.elm-lang.org/packages/jonathanfishbein1/numeric-typeclasses/latest/) to define instances of Semigroup, Monoid, Group, Ring, and Field for Complex Numbers.  These instances can be valuable if you are trying to define generic functions in your own projects that can operate on both Real.Real and Complex Numbers.

```elm
{-| Group for Complex Numbers with addition as the operation
-}
complexSumGroup : Group.Group (ComplexNumber number)
complexSumGroup =
    { monoid = complexSumMonoid, inverse = \(ComplexNumber (Real.Real x) (Imaginary y)) -> ComplexNumber (Real.Real -x) (Imaginary -y) }

{-| Group for Complex Numbers with multiplication as the operation
-}
complexProductGroup : Group.Group (ComplexNumber Float)
complexProductGroup =
    { monoid = complexProductMonoid, inverse = \(ComplexNumber (Real.Real x) (Imaginary y)) -> divide one (ComplexNumber (Real.Real x) (Imaginary y)) }

```
