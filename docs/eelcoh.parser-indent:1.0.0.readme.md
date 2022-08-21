A parser for parsing indented lists.

This was inspired by the [YAML library](https://github.com/terezka/yaml) by [Tereza Sokol](https://twitter.com/terezk_a). I recommend watching her [Elm-Conf talk on parsers](https://www.youtube.com/watch?v=M9ulswr1z0E).


## Example - parsing a list:

The following document contains a list with indented items:
```
List:
  Item 1
  Item 2
  Item 3
  Item 4
  Item 5
```
It should be parsed into the following type:

```elm
-- Type
type Item
    = Item Int
```

With the following parsers:
```elm
-- Parsers
item =
    succeed Item
        |. keyword "Item"
        |. spaces
        |= int

list =
    succeed identity
        |. keyword "List"
        |. spaces
        |. symbol ":"
        |. spaces
        |. eol
        |= Indent.list item

spaces =
  chompWhile (\c -> c == ' ')

eol =
    chompUntilEndOr "\n"
```

## Example - parsing a tree with recursive lists:

Read this document:
```
Node
  Node
    Leaf 1
    Leaf 2
    Leaf 3
  Leaf 4
```

Into a tree type:
```elm
-- Type
type Tree
    = Node (List Tree)
    | Leaf Int

```

With the following parsers:
```elm
-- Parsers
tree =
    oneOf
        [ node
        , leaf
        ]

leaf =
    succeed Leaf
        |. keyword "Leaf"
        |. spaces
        |= int

node =
    succeed Node
        |. keyword "Node"
        |. spaces
        |. eol
        |= Indent.list (lazy (\_ -> tree))

spaces =
  chompWhile (\c -> c == ' ')

eol =
    chompUntilEndOr "\n"
```
