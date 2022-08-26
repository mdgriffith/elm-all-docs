# Elm Actor Framework - Sandbox

![Build Status](https://github.com/bellroy/elm-actor-framework-sandbox/workflows/Continuous%20Integration/badge.svg) [![Elm package](https://img.shields.io/elm-package/v/bellroy/elm-actor-framework-sandbox.svg)](https://package.elm-lang.org/packages/bellroy/elm-actor-framework-sandbox/latest/)

This package is as an extension of the [Elm Actor Framework](https://github.com/bellroy/elm-actor-framework) [Package](https://package.elm-lang.org/packages/bellroy/elm-actor-framework/latest).

Easily run your component as a sandboxed application,
add testCases and turn them into Elm tests!


```elm
import Framework.Sandbox as Sandbox
import Framework.Sandbox.TestCase as TestCase
import Framework.Sandbox.Browser as Browser
import Component.Counter exposing (component, Model, MsgIn(..))

sandboxed: SandboxComponent Int Model MsgIn () (Html MsgIn)
sandboxed =
    Sandbox.fromComponent () component
        |> Sandbox.addTestCase
            (TestCase.make
                { title = "Increment"
                , description = "Increment the counters value by one."
                , test = \_ a b -> Expect (b - a) 1
                }
                |> TestCase.setActions [ Increment ]
            )
        |> Browser.document
```
