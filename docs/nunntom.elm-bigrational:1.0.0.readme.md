
# BigRational

A [rational number](https://en.wikipedia.org/wiki/Rational_number) is any number that can be represented as a ratio, or fraction of two integers.

With rational numbers you can express non-integer values with exact precision, and perform arithmetic without the pitfalls of floating point errors.

Elm's native integer type uses raw JavaScript integers which are limited in size. BigRational uses [cmditch/elm-bigint](https://github.com/cmditch/elm-bigint/blob/2.0.1/README.md) under the hood for unlimited size numbers. This and the precision of rational numbers makes the module suitable for safely representing and manipulating things like monetary values, albeit at the cost of some performance.

## Contributing

Contributions are always welcome!

## Acknowledgements

 - Thanks to Coury Ditch for [elm-bigint](https://github.com/cmditch/elm-bigint) which BigRational depends on.
 