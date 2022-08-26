DictDotDot is just a copy of core Dict *fully* exposing
two internal types (so `Dict(..)` and `NColor(..)`):

```elm
type Dict k v
    = RBNode_elm_builtin NColor k v (Dict k v) (Dict k v)
    | RBEmpty_elm_builtin

type NColor
    = Red
    | Black
```

The **goal** is to open up internals to folks who want to
- teach Dict internals
- learn Dict internals
- test/validate Dict internal (example: are the trees well-balanced?)

There's a helper function called `DictInternal.toInternalRepresentation`
that produces data like the following:

```elm
    [{ color = "B", k = 1, path = "l", v = "one" },
     { color = "B", k = 2, path = "", v = "two" },
     { color = "R", k = 3, path = "rl", v = "three" },
     { color = "B", k = 4, path = "r", v = "four" }]
```

That format's pretty easy to manipulate for many use
cases, and it is a complete representation of the tree,
but if that doesn't work for you, just read the
source for `DictInternal`.

You can also read/make/run `Main.elm` to see this in action for
a tiny dict.

To play with `DictDotDot` in apps with minimal changes, you can
do `import DictDotDot as Dict`.
