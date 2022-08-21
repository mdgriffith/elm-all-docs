[![Build Status](https://travis-ci.org/teocollin1995/complex.svg?branch=master)](https://travis-ci.org/teocollin1995/complex)

# complex
A complex number library for Elm. Someone needed to write one. 

# Tests

I've found that testing numeric computations in elm can be a little bit annoying. Just testing a few critical values is not good enough so you need to randomly generate values and you need to compute the correct values from those values. This could be done with native, but that is rather annoying. Instead, I decided to have python to calculate a bunch of correct values from some randomly generated complex numbers and then write the test code from that. How I do this can be seen in testgen.py, which is not yet documented. 

# Update to elm 0.18.0

Minor changes to Complex.elm for elm ver 0.18.0

Major changes to tests to use elm-community/elm-test ver 0.18.9

Tests have been split into separate files to avoid stack overflow. testgen-0.18.py creates a suite of 15 test files, each containing 200 randomly generated tests for a specific function of the library.

Tests now use relative tolerance. See [Guide to Floating Point Comarison](http://package.elm-lang.org/packages/elm-community/elm-test/4.2.0/Expect) for the rationale. All tests pass within a relative tolerance of 0.0000000000001.

You must install [elm-test](https://github.com/elm-community/elm-test) to use the new tests. To install, do:

```code
$ npm install -g elm-test
```
To run tests, do:

```code
$ cd tests && make
```

This will generate the test files if necessary and then run them in sequence. Each testfile contains 200 random tests for a primary library function. A given testfile uses additional functions from the library to test a primary function thereby providing good test coverage.

You can optionally run a single testfile. Example:

```code
$ elm-test tests/Abs.elm
```

You can generate a new set of testfiles thus:

```code
$ cd tests && make clean && make
```

Testfiles created are:

Abs.elm Acos.elm Arg.elm Asin.elm Atan.elm Cos.elm Div.elm Exp.elm Ln.elm Mult.elm Pow.elm Sign.elm Sin.elm Sqrt.elm Tan.elm

# Functionality 

### Basics
complex, i, one, zero, fromReal

### Basic Unary Operations
real, imaginary, abs, conjugate, negation, sgn, arg, sqrt

### Basic Binary Operations
add, sub, mult, div

### Trig
sin, cos, tan, asin, acos, atan, euler

### Exponents and Logarithms
ln, exp, pow

# Credits

Teodoro Fields Collin [email](<teocollin1995@gmail.com>) original author

Kevin Butler [email](<haqkrs@gmail.com>) port to elm 0.17.0

Ryman [github](https://github.com/Ryman) port to elm 0.17.0

Teo [email](<wraith1995@users.noreply.github.com>) [github](https://github.com/wraith1995) current maintainer

Stu Heiss [email](<stu@stuheiss.com>) [github](https://github.com/stuheiss) port to elm 0.18.0
