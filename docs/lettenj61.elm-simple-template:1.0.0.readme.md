# elm-simple-template

## Usage

```elm
import Template exposing (Template)
import Template.Params as Params exposing (Params)

t : Template
t =
  Template.compile
    Template.defaultOptions
    (String.trim """
      Is it ...
        * Delightful? {{delightful}}!
        * Powerful? {{powerful}}!
        * Complex? {{complex}}!
    """)

params : Params
params =
  Params.fromList
    [ ( "delightful", "Yes" )
    , ( "powerful", "Yes" )
    , ( "complex", "No" )
    ]

str : String
str =
  Template.run params t
```


## License

MIT.