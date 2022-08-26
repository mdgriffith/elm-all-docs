# Colors for Elm-UI

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

Elm packages: [elm\-ui\-colors](https://package.elm-lang.org/packages/phollyer/elm-ui-colors/latest/)

This package provides a range of HTML/CSS Colors for use with [ Elm-UI ](https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/ "The best UI package for Elm").


## Install
```bash
$ elm install phollyer/elm-ui-colors
```

# Design Goals

This package is intended to provide easy access to HTML/CSS color names, which should make it easier to switch from using CSS to Elm-UI if you use color names in your CSS.

So, if you currently do something like this:

## CSS

```css
.myClass {
  background-color: yellow;
  color: purple;
}
```

## Elm

```elm
Html.div
  [ class "myClass" ]
  [ Html.text "Hello World" ]
```

You can lose the CSS completely using Elm-UI and Elm-UI-Colors as follows:

## Elm-UI

```elm
Element.el
  [ Background.color yellow
  , Font.color purple
  ]
  [ Element.text "Hello World" ]
```

# Usage

Simply import the colors you require, and use them with your Elm-UI attributes.

## Example

To see the actual colors, clone the [repo](https://github.com/phollyer/elm-ui-colors) and run the [example](https://github.com/phollyer/elm-ui-colors/tree/master/example) in elm reactor.

```elm
module Main exposing (main)

{-| -}

import Element as El
import Element.Background as Background
import Element.Font as Font
import Colors.Opaque exposing (black, hotpink, white)


main =
    El.layout
        [ Background.color black
        , El.width El.fill
        , El.height El.fill
        ]
        <|
            El.column
                [ El.centerX, El.centerY ]
                [ El.el
                    [ Font.color white ]
                    ( El.text "white")
                , El.el
                    [ Font.color hotpink ]
                    ( El.text "hotpink")
                ]
```



