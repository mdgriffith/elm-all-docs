# group-list
Elm functions to group lists with more control

# Motivation
I wanted to write a phone style input like

<img src=".resources/phonedial.png" height="500">

this means the layout now needs `br` tags, these tags are put within each 3 buttons.
I wanted to be able to generate the buttons and just make the breaks work!
Elm's [`intersperse`](https://package.elm-lang.org/packages/elm/core/latest/List#intersperse) would only work for all elements.

So I wrote this package, meaning now you can take a List and interleave values at whatever interval you want!