# elm-refine

Provides support for refinement types including various ways of handling enums in Elm.

# Enum Examples

An enum can be defined as custom type:

```
type Pet
    = Cat
    | Dog
    | Snake
    | Spider
```

Or as a guarded type:

```
type Pet
    = Pet String
```

Or just as a list of strings:

```
[ "Cat"
, "Dog"
, "Snake"
, "Spider"
]
```

See the various examples under the `examples/` folder for each of these ways of defining
an enum.
