# elm-odata4

Build Open Data Protocol (OData v4) queries in Elm.

This package supports a _subset_ of OData 4.01
[_query option_](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_CommonExpressionSyntax),
[_common expression_](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_CommonExpressionSyntax), and
[_primitive literal_](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_PrimitiveLiterals).

<http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html>

<http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html>

  - If you need a _query option_, _common expression_, or _primitive literal_
    that is missing in this package undeservedly, suggest a PR
  - If what you need is missing in this package and it's ok, or it deviates from the standard,
    or [other](https://github.com/microsoftgraph/microsoft-graph-docs/issues/14547), then for:
      - _query option_, append custom [`Url.Builder.QueryParameter`](https://package.elm-lang.org/packages/elm/url/latest/Url-Builder#QueryParameter) (see example)
      - _common expression_, use `plainStringOperator` (see example)
      - _primitive literal_, use `customValue` (see example)

## Example

``` elm
import Time
import Url
import Url.Builder

-- Custom value function
dateAsString : Time.Posix -> Value
dateAsString posix =
    customValue (\s -> "'" ++ s ++ "'") (date posix)

[ filter
    ( or
        [ eq "City" (string "Tallinn")
        , eq "City" (string "Singapore")
        -- Custom operator
        , plainStringOperator "concat(concat(City,', '), Country) eq 'Berlin, Germany'"
        -- Custom value
        , ge "start/dateTime" (dateAsString (Time.millisToPosix 1631124861000))
        ]
    )
, top 20
, skip 40
, orderBy [ ("Created", Just desc), ("City", Just asc) ]
, select [ "Id", "City", "Created", "Body" ]
]
|> List.map toQueryParameter
-- Custom query option
|> List.append [ Url.Builder.string "$search" "blue OR green" ]
|> Url.Builder.toQuery >> Url.percentDecode
--> Just (String.join ""
--> [ "?$search=blue OR green&"
--> , "$filter=City eq 'Tallinn' or "
--> ,   "City eq 'Singapore' or "
--> ,   "concat(concat(City,', '), Country) eq 'Berlin, Germany' or "
--> ,   "start/dateTime ge '2021-09-08'&"
--> , "$top=20&"
--> , "$skip=40&"
--> , "$orderBy=Created desc,City asc&"
--> , "$select=Id,City,Created,Body"
--> ])
```

## Installation

``` sh
$ elm install Yagger/elm-odata4
```

## Testing

``` sh
npx elm-verify-examples --run-tests
```

## License

Copyright © 2021 Jegor Uglov

Distributed under the MIT license.