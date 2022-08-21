# Elm spa composition

School project used in master's degree thesis. Purpose of this project is to enable elegant page composition in single page applications in Elm. Using this package in SPA, one should get rid of all the unnecessary boilerplate code in main module that serves just the puspose of composing various pages.

Everything needed for page composition is in src folder, in _Alt_ module. Alt module consists of helper types, functions for composition, router, url parsing and header and footer, e.g. everything needed to build SPA.

## Installation

To use in elm project just install the package:

```elm
elm install adamstuller/elm-spa-composition
```

## Usage

After install import _PageWidget_ type from _Alt_ module in every page module.
This page widget, containg all the main functions should be the only think (along with parser if needed) exposed from module.

In _Main.elm_ just import all page widgets and join them using _join_ and _add_ functions. In the end add router using _initRouter_ function.

## Example

Simpliest example can be found in this repository in example folder. There one can find various pages using different concepts an also the main module.

Another example is simple SPA called tabor bizon, created as byproduct of master's thesis located on github <https://github.com/adamstuller/taborbizon>. There you can see difference between braches _main_ which is still written without our example and branch _rewrite_ which is written using this package.

In this repository code in main module looks like this:

```elm
main =
    Home.initPage topParser
        |> join (Form.initPage <| basicParser "form")
        |> add (Another.initPage <| basicParser "another")
        |> initRouter "Tábor bizón" viewHeader viewFooter
        |> Browser.application
```

Just two pages cleanly connected using one function without any boilerplate code.

Yet another example is _Realworld_ application written by Richard Feldman. This application is also on github - <https://github.com/rtfeldman/elm-spa-example>. We refactored this application as well and result can be seen on our forked repository: <https://github.com/adamstuller/elm-spa-example>. Here on branch _master_ is old Feldman's code and on brach _rewrite_ is ours.
