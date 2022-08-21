[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/efdf5e9e/elm-speedcubing)

# Elm Speedcubing

This package aims to make it easy to create advanced and powerful applications for speedcubing using Elm. It will allow you to manipulate cubes, (soon) animate movement on them, display them, validate algorithms as user input, and deal with concepts such as AUF and algorithm sets such as PLL and OLL. It is also open to handling many other topics as well if it fits under the umbrella of enabling powerful front-end applications for speedcubing.

The two main modules the whole package revolves around is Cube and Algorithm, with separate modules for different algorithm sets and other concepts. There is a Cube.Advanced module as well which shouldn't be needed unless you want to display the cube in a different way than this package does, or do some very custom logic that depends on specific state of the cube.

Feel free to submit feature requests on Github Issues if you feel like there's something you feel like the package should include, or something you currently need to use Cube.Advanced for that it makes sense for the package to do inside the Cube module.

To see examples of the package in use, check out our [examples folder](https://github.com/emilgoldsmith/elm-speedcubing/tree/main/examples/src), and otherwise of course check out the documentation at [package.elm-lang.org](https://package.elm-lang.org/packages/emilgoldsmith/elm-speedcubing/latest/),
