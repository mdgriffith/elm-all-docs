# Dict.Nonempty 

Similarly to [Nonempty String](https://package.elm-lang.org/packages/MartinSStewart/elm-nonempty-string/latest/) and [Nonempty List](https://package.elm-lang.org/packages/mgold/elm-nonempty-list/latest/) provides
a type that is guaranteed to have at least one entry. 

It consist of a key-value pair and a regular Dict 

```elm
type NonemptyDict comparable v
    = NonemptyDict ( ( comparable, v ), Dict comparable v ) -- the constructor is opaque
```


hence it only allows comparable keys (same as Dict) and it exposes function `head : NonemptyDict comparable v -> ( comparable, v )` that is guaranteed to succeed (no Maybe) and returns the key-value pair with the lowest key 
(Note on performance: Dict is always internally ordered to make the operations on it fast - that's why it allows only comparable key - so this head functions is inexpensive as well as in only adds one more comparison of keys)


## Common usage

Has very similar functions to the regular Dict with a few exceptions 

### Dict.Nonempty.remove

returns Maybe

```elm
remove : comparable -> NonemptyDict comparable v -> Maybe (NonemptyDict comparable v)
```

### Dict.Nonempty.fromList

has one more parameter `(comparable,v)` so that non-emptiness is guaranteed

```elm
fromList : ( comparable, v ) -> List ( comparable, v ) -> NonemptyDict comparable v
```

## Why would you use this?

Not sure about that but I am using it for tracking errors when constructing a record out of user input (form) where key is field index. So it is something like a nonempty `Array (Maybe error)` but you don't have to deal with inserting the Nothings as Arrays can't have holes i.e.

```elm
Array.fromList ["a","b"]
  |> Array.set "d"            -- there is gap between last index (1 - where "b" is) and index we are trying to set
  |> Array.toList ["a","b"]   -- hence the the "d" is lost
```

The construction fails only when there is an error so there is a guarantee that there will be at least one entry
and it should be possible to ask - give me only the first error that occurred (hence the above-mentioned function `head`)
