The [billstclair/elm-id-search](http://package.elm-lang.org/packages/billstclair/elm-id-search/latest) package allows quick search for substrings of record identification strings.

You can use it to index identifying strings for any record type. For example, you could index `User` records by their userid to offer completions while typing "@foo" for a Twitter interface.

There's a live example, showing completion of lists of popular boy and girl baby names at https://billstclair.github.io/elm-id-search

An `elm repl` example:

```
$ elm repl
> import IdSearch exposing (..)
> ids = ["avh4","brianhicks","czaplic","eeue56","elmlang","lukewestby","mdgriffith","noredink","rtfeldman","terezka","zwilias"]
> table = makeTable 3 List.singleton |> insertList ids
{ dictCount = 3, dicts = [Dict ... ]
, getIdentifiers = <function> }
    : Table String
> lookup "c" table
["czaplic"] : List String
> lookup "li" table
["zwilias","czaplic"] : List String
> lookup "hicks" table
["brianhicks"] : List String
> lookup "hicke" table
[] : List String
```
