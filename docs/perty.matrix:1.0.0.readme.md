# Matrix
Two-dimensional matrix backed by Array from the Elm core, the fast immutable array
implementation.

The main motivation for this is the `indexedMap` function that is useful in games where you
want to act depending on position as well as content. E.g., the game of life where the cell
is depending on its neighbours.

Speaking of `neighbours`, that is also a function in this package.

API design follows the Elm core Array module.