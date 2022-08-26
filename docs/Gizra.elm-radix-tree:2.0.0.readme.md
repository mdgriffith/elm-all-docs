[![Build Status](https://app.travis-ci.com/Gizra/elm-radix-tree.svg?branch=main)](https://app.travis-ci.com/Gizra/elm-radix-tree)

# Radix tree

Radix tree is defined in Wikipedia: <https://en.wikipedia.org/wiki/Radix_tree>

A data structure that represents a space-optimized trie (prefix tree) in which
each node that is the only child is merged with its parent.

Under the hood, the Tree structure is managed with
[elm-rosetree](https://package.elm-lang.org/packages/zwilias/elm-rosetree/latest/)

In this package we have two kinds of implementations, one is ordered and the
other is unordered. It's possible that the unordered isn't called "Radix tree"
but the author of the package doesn't know of a better name.

It would be easier to follow by example, or try it on a helpful app like
this one: <https://www.cs.usfca.edu/~galles/visualization/RadixTree.html>

## Ordered Radix Tree

Say we have the following list of chars:

```elm
[ [ "r", "o", "m", "a", "n", "e" ]
, [ "r", "o", "m", "u", "l", "u", "s" ]
, [ "r", "u", "b", "e", "n", "s" ]
, [ "r", "u", "b", "e", "r" ]
, [ "r", "u", "b", "i", "c", "o", "n" ]
, [ "r", "u", "b", "i", "c", "u", "n", "d", "u", "s" ]
]
```

We would like to represent this as a Radix tree where letters that repeat are
in parent nodes, and the rest are in child nodes.

It would look like this:

- r
    - ub
        - ic
            - undus
            - on
        - e
            - r
            - ns
    - om
        - ulus
        - ane

This package allows inserting values to the tree in an Ordered and Un-ordered manner.
The ordered one is presented above. The "order" is in relation to the position of each
letter. That is, when we look for the letter "r" that is the beginning of the list, 
on an Ordered list, we match it only to other "r" letters that are also at the beginning.

## Un-Ordered Radix Tree

An Un-ordered insert on the other hand doesn't care about the position of the chars, but rather if they exist or not.

Here's an example of how an unordered insert would result, assuming we have this list
of Int.

```elm
[ [ 1, 2, 3 ]
, [ 2, 1, 4 ]
, [ 4, 5, 6 ]
]
```

This will result with:

- 1, 2
    - 3
    - 4
        - 5
        - 6

## Example

You can see the package in action with the example provided

    cd example
    elm rector

Then navigate to http://localhost:8000/example/src/Example.elm

## Tests & Code Quality

    npm install
    npm test

This will execute:

1. [Elm verify examples](https://github.com/stoeffel/elm-verify-examples) and [Elm test](https://github.com/elm-explorations/test)
2. Validate `elm-format`
3. Analyze with `elm-review`

## Related Packages

- [elm-tries](https://package.elm-lang.org/packages/elm-scotland/elm-tries/latest) - 
The reason we have this package is for being able to have unordered Radix trees as-well,
and for being able to work with the very handy [elm-rosetree](https://package.elm-lang.org/packages/zwilias/elm-rosetree/latest/)
Tree's API.