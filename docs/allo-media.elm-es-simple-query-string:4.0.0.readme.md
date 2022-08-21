# Elm simple elastic query

Parse and serialize [ElasticSearch](https://www.elastic.co/en) search query strings.

This package allows to parse an
[elastic simple query string](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html#_simple_query_string_syntax)
into an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), and serialize
string search queries out of it.

**Notes:**

  - Serialization will enforce classic boolean operator precedence by using
    parenthesis groups everywhere applicable.

[Demo](https://allo-media.github.io/elm-es-simple-query-string/)

## Alphabet

    ( ) Group
    [WORD] Char+
    | OR
    \+ AND
    -- Exclude
    "" Exact
    ~n Fuzzy
    \* Prefix

Specific case : Spaces (signifying in some contexts and not in others)

## AST

```elm
type Expr
    = And (List Expr)
    | Exact String
    | Exclude Expr
    | Fuzzy Int String
    | Or (List Expr)
    | Prefix String
    | Word String
```

## Production rules

Unless explicitly indicated, spaces are ignored.

    Query => ORExpr EOF
    ORExpr => ANDExpr | ANDExpr "|" ORExpr
    ANDExpr => EXCExpr | EXCExpr ("+"|\s+) ANDExpr
    EXCExpr => "-" GRPExpr | GRPExpr
    GRPExpr => WORD~"\*" | WORD~"\~2" | WORD | \" EXACTExpr \" | "(" ORExpr ")"
    EXACTExpr => [^"]+

## Example

Source query string:

    big* (potatoes | "french fries") -salad

Parsing:

    $ elm repl
    ---- Elm 0.19.0 ----------------------------------------------------------------
    Read <https://elm-lang.org/0.19.0/repl> to learn more: exit, help, imports, etc.
    --------------------------------------------------------------------------------
    > import Elastic exposing (Expr(..))   
    > Elastic.parse "big* (potatoes | \"french fries\") -salad"
    Ok (And [Prefix "big",Or [Word "potatoes",Exact ("french fries")],Exclude (Word "salad")])
      : Result (List Parser.DeadEnd) Elastic.Expr

Serialization:

    > Elastic.serialize (And [Prefix "big",Or [Word "potatoes",Exact ("french fries")],Exclude (Word "salad")])
    "big* (potatoes | \"french fries\") -salad" : String

## License

[MIT](https://opensource.org/licenses/MIT)
