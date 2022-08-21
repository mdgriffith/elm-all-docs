# elm-index

Disambiguate between different `Index` types by taggging `Index a`.

``` elm
-- With an anonymous record.
type alias RecordIndex =
    Index { record : () }

-- You could use some type you already have.
type BlockContent
    = Text String
    | Image String

type alias BlockIndex =
    Index BlockContent

-- Or, if you don't want to write `Index a` everywhere.
type alias Index =
    Index ()

```

Replace `Int` with the `Index a` type.

``` elm
example : List ( Index { example : () }, String )
example =
    Index.indexedMap List.indexedMap
        Tuple.pair
        ["hallo", "hola", "hello"]

example : Array ( Index { example : () }, Int )
example =
    Index.indexedMap Array.indexedMap
        Tuple.pair
        (Array.fromList [1, 2, 3])
```


Make functions that expect an `Int` take an `Index a`.

``` elm
example : Index { example : () } -> Maybe Int
example index =
    Index.withIndex Array.get index <|
        Array.fromList [1, 2, 3]
```
