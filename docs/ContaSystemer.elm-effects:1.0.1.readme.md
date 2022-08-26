# Effects

Effects package helps to manage additional program effects.

## Use case #1

An Elm application (program/system) can be designed as a combination of sub-systems.
Examples of sub-systems can be a system for animation, a system for communication with JS, a system for working with time, etc...
Different sub-systems can communicate with each other using effects.

## Use case #2

One of the concepts in Elm to maintain shared state is called ["taco technique"](https://github.com/ohanhi/elm-shared-state).
Effects is a good way to update shared state because multiple effects can be processed at once.

## Use case #3

Effects can be used together with [elm-program-test](https://package.elm-lang.org/packages/avh4/elm-program-test/latest/) package.

## Your use case

Please share what use cases you have.

## Packages which use Effects

- [MsgFromJs](https://package.elm-lang.org/packages/ContaSystemer/elm-effects-msg-from-js/latest/)
- [Animation](https://package.elm-lang.org/packages/ContaSystemer/elm-effects-animation/latest/)
- [Time](https://package.elm-lang.org/packages/ContaSystemer/elm-effects-time/latest/)