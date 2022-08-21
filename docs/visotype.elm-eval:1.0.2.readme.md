# visotype/elm-eval

**Pass function calls as data from JavaScript to Elm (experimental)**

This package provides an infrastructure for parsing and evaluating Elm
function calls that have been passed in as data through ports. It handles
parsing of the module/function name and arguments, executes the function if
available in the specified library, and returns a `Result` (wrapping a
single JavaScript value when successful).

The goal of this project is to be able to execute compiled Elm functions in
JavaScript without having to manually set up ports and subscriptions on both
sides. This approach enables Elm to be used for transforming data and updating
data models, providing built-in JS to Elm type checking, a no-side-effects
guarantee, and enforced error handling on the JS side. One application is to
use an Elm program as state container for web applications built with other
templating libraries.

To do:
- [X] Support all Core library functions except those that take functions or untyped comparables as arguments
- [ ] Support functions that take other functions as arguments by allowing the user to pass calls as arguments
- [ ] Come up with a solution for handling untyped comparison functions
- [ ] Improve documentation
- [ ] Provide examples for extending elm-eval
- [ ] Provide access to other useful Elm libraries
