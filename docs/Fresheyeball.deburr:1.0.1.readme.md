# Deburr

A small package exposing the deburr function, which converts unicode
characters with burrs (umlauts, accents, etc) to their ASCII counterparts.
The function intelligently handles capitals and some other edge cases.

For example lets say you want to provide your users with a
search input. And you want the search to be as forgiving as possible.
You might make the search case insensitive, use Levenshtein, but what
about burrs like in "Jalapeño"? The search might work better on "Jalapeno".

```elm
deburr "Jalapeño" == "Jalapeno"
```

While useful, this function is expensive. Use with care.

