![Tests](https://github.com/Timo-Weike/generic-collections/workflows/Tests/badge.svg?branch=master&event=push)

# generic-collections
An elm-library intended as a work-around for the missing support for ordering on custom types in elm 0.19

This package wraps the `Dict` from `elm/core` to be able to use an type as either key for dictionaries or value for sets. 
I know that there are other packages that provide workarounds like [`edkv/elm-generic-dict`][elm-generic-dict], [`pzp1997/assoc-list`][assoc-list] or [`erlandsona/assoc-set`][assoc-set] but for me all these package have the same problem - they only provide a solution for either `Dict` or `Set` and not `Both`. 
I also know that there is the package [`eeue56/elm-all-dict`][all-dict] that solved the problem for `Dict` best, but since 0.19 and the forbidden use of external js-code it is no longer usable.

This package provides implementations of `Dict` and `Set` that uses user provided functions that *hashes* the key/value to a comparable type (like `Int` or `String`).
But these implementations come in two fashions: 
The first (identified by the prefix `Manual`) needs for every function that needs to compare keys/values a hash-function. This has arguably pros and cons. 
One pro is that the hash-functions does not be saved any where and can be better optimized by the compiler, a con is that is more likely to cause errors and miss behavior if different hash-functions are used for the same data structure.
The second (identified by the prefix `Auto`) accepts a hash-function upon creating a new `Dict`/`Set`, which it uses for almost every functions.

# Usage

The `Auto` variants can be used as an almost drop-in replacement for the their
core variants. But you will need to adjust some things.

 * replace `import <Dict/Set> exposing (<Dict/Set>)` with `import Auto<Dict/set> as <Dict/Set> exposing (<Dict/Set>)`
 * replace `Dict k v` with `Dict <comparable> k v` where `<comparable>` is your comparable type of choice and `Set v` with `Set <comparable> v`
 * add a hash-function argument to calls to `empty`, `singleton` and `fromList`:
 so make `dict = empty` to `dict = empty someFunction`

```
import AutoSet as Set exposing (Set)

type Pet 
    = Dog String
    | Cat String
    | Bird String

petToString : Pet -> String
petToString pet = case pet of
    Dog name -> "Dog: " ++ name
    Cat name -> "Cat: " ++ name
    Bird name -> "Bird: " ++ name


pets : Set String Pet
pets 
    = Set.fromList petToString
        [ Dog "Max"
        , Cat "Jerry"
        , Bird "Ace"
        ]

Set.member (Dob "Paul") --> False
Set.member (Dob "Max") --> True
Set.toList pets --> [Bird "Ace", Cat "Jerry", Dog "Max"]
```

# Performance

Since the implementations of both `Dict` and `Set` uses a tree structure and a custom hash-function the performance of the functions a dependent on the complexity of the used hash-function multiplied by the complexity of the function.

For example: The function `AutoDict.fromList` has a complexity of *O(n &ast; log n)*. 
Suppose we use a hash function that has a complexity of *O(m)*.
Then the complexity of

    AutoDict.fromList hashFunction <someList>

is *O(m &ast; n &ast; log n)*

For a complexity of each function see the documentation of that function.
# Motivation

You might think by now why bother with all this if I have to define a mapping from my type to a comparable type either way, why not just use `elm/come.Set Int` for example.

The reason is type safety.

Imagine you want to create a sudoku web-app, then you might want to model the value a cell can have as their own type instead of an int.
You might define it like this

    type CellValue 
        = V1 | V2 | V3
        | V4 | V5 | V6
        | V7 | V8 | V9

then you can do a case-of like

    someResult = case cellValue of
        V1 -> someFunction_1
        V2 -> someFunction_2
        ...
        V9 -> someFunction_9

instead of

    someResult = case cellValue of
        1 -> someFunction_1
        2 -> someFunction_2
        ...
        9 -> someFunction_9
        _ -> someFunctionForACaseYouDontWant

You might think that one line is not that of a deal, but this is a case that you don't want to handle in your model.

Okay, that is the motivation but why now do it by *hand* in every project.
Well `AutoSet` is defined as

    import ManualSet as BaseSet

    type Set comparable v
        = Set (v -> comparable) (BaseSet.Set comparable v)

and `ManualSet` is defined as

    type Set comparable v 
        = Set (Dict comparable v)

This would be not so pretty IMO especially because I want the semantic of a set
but use a structure called a dict.
I personally don't find it appealing, which motived me to write this package.

[elm-generic-dict]: https://package.elm-lang.org/packages/edkv/elm-generic-dict/latest/
[assoc-list]: https://package.elm-lang.org/packages/pzp1997/assoc-list/latest/
[assoc-set]: https://package.elm-lang.org/packages/erlandsona/assoc-set/latest/
[all-dict]: https://github.com/eeue56/elm-all-dict/blob/master/elm-package.json