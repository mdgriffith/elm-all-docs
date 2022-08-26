# [Association lists](https://en.wikipedia.org/wiki/Association_list)

A list in which each element comprises a key and a value, in Elm's typesystem `List ( k, v )`.

This package help with operations like:

- find the first pair or all the pairs where the key satisfy a certain property
- filter out the pairs with a certain key
- group all the pairs with the same key

---

In some cases you may need to work with a [Dict](https://package.elm-lang.org/packages/elm/core/latest/Dict), but you need non-[comparable](https://package.elm-lang.org/packages/elm/core/latest/Basics#comparison) keys, duplicate keys, or you have to keep the insertion order. Plain lists can satisfy these requirements and the [List](https://package.elm-lang.org/packages/elm/core/latest/List) module is plenty of functions that can be reused with list of tuples. This package adds to this great collection a set of functions that works on lists of pairs where the first element represents a key.
