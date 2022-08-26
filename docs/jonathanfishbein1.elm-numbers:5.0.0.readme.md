# Real Numbers, Imaginary Numbers, and Complex Numbers

## Summary

A module to define real numbers, imaginary numbers, and complex numbers and basic arithmetic operations on them.

I accidently published this package *before* checking to see if there already existed an Elm package for complex numbers.  This was a rookie mistake I made when getting started developing Elm packages.

However, this package has matured and does contain functionality that differs from the two other Elm complex number packages.  Most notably this package makes use of [jonathanfishbein1/numeric-typeclasses](https://package.elm-lang.org/packages/jonathanfishbein1/numeric-typeclasses/latest/) to define instances of Semigroup, Monoid, Group, Ring, and Field for real numbers and complex numbers.  These instances can be valuable if you are trying to define generic functions in your own projects that can operate on both Real.Real and Complex Numbers.

```elm
{-| Group for Complex Numbers with addition as the operation
-}
sumGroup : Group.Group (ComplexNumber number)
complexSumGroup =
    { monoid = sumMonoid, inverse = \(ComplexNumber (Real.Real x) (Imaginary y)) -> ComplexNumber (Real.Real -x) (Imaginary -y) }

{-| Group for Complex Numbers with multiplication as the operation
-}
productGroup : Group.Group (ComplexNumber Float)
productGroup =
    { monoid = productMonoid, inverse = \(ComplexNumber (Real.Real x) (Imaginary y)) -> divide one (ComplexNumber (Real.Real x) (Imaginary y)) }

```
