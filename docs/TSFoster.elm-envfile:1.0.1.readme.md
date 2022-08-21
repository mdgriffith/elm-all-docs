# elm-envfile

Parser and encoder for envfile file format, following simple definition provided
by [Docker](https://docs.docker.com/compose/env-file/).

## Examples

### Parsing


```elm
import Dict
import Envfile
import Parser


[ "linesInThisFile=7"
, "numberOfDefinitions=5"
, "containsBlankLines=TRUE"
, ""
, "# Commented line"
, "ENV=development"
, "Thing="
]
    |> String.join "\n"
    |> Parser.run Envfile.parser
--> Ok <| Dict.fromList
-->     [ ("linesInThisFile", "7")
-->     , ("numberOfDefinitions", "5")
-->     , ("containsBlankLines", "TRUE")
-->     , ("ENV", "development")
-->     , ("Thing", "")
-->     ]
```

```elm
import Envfile
import Parser


[ "containsInvalidLine=TRUE"
, ""
, "here"
, ""
, "# Commented line"
, "ENV=development"
]
    |> String.join "\n"
    |> Parser.run Envfile.parser
--> Err [ { col = 5, row = 4, problem = Parser.ExpectingSymbol "=" } ]
-- (No idea why row = 4, not 3!)
```


### Encoding

```elm
import Dict
import Envfile


[ ("this is not a valid variable name!", "so it won’t be included")
, ("thisIsThough", "So it will, and the newline will be escaped too\n!")
]
    |> Dict.fromList
    |> Envfile.encode
--> "thisIsThough=So it will, and the newline will be escaped too\\n!"

```

```elm
import Dict
import Envfile


[ ("MAGIC_NUMBER", "346")
, ("GREETING", "Hello world")
, ("API_KEY", "239847dflkjw34o87fjsdfkuy3dj")
]
    |> Dict.fromList
    |> Envfile.encode
    |> String.lines
    |> List.sort
--> [ "API_KEY=239847dflkjw34o87fjsdfkuy3dj"
--> , "GREETING=Hello world"
--> , "MAGIC_NUMBER=346"
--> ]
```
