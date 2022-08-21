# elm-geometry-test

This package contains some helpful utilities for testing code that uses
[`elm-geometry`](https://package.elm-lang.org/packages/ianmackenzie/elm-geometry/latest/).
This includes both [`Fuzzer`](https://package.elm-lang.org/packages/elm-explorations/test/latest/Fuzz)s
for generating random geometric values, and functions for constructing
[`Expectation`](https://package.elm-lang.org/packages/elm-explorations/test/latest/Expect)s
that compare geometric values to within a small tolerance (to allow for
numerical roundoff).

If you have an app or package that uses `elm-geometry` and you want to use this
package to help with testing, you would generally add `elm-geometry` to your
`dependencies` and `elm-geometry-test` to your `test-dependencies`. Note that 
this package is fairly new and breaking API changes may occur (it should not be
considered as stable as `elm-geometry` itself).


## Contributing

All the code in this repository is simply copied over from some internal testing
modules in `elm-geometry` so that they can be published separately; if you find
a bug or are interested in contributing new functionality, please [open a new
issue](https://github.com/ianmackenzie/elm-geometry/issues) there!
