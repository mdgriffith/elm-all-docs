# elm-csv

Parse CSV files according to [RFC 4180](https://tools.ietf.org/html/rfc4180) (including values with quoted commas).

## Install

```bash
elm install samuelstevens/elm-csv
```

## Quick Start

Suppose you have a file `star-wars-quotes.csv` with the following content:

```csv
quote,character
"Why, hello there",Obi-Wan Kenobi
"General Kenobi.",General Grievous
```

Once this is read into an Elm string, you could parse it like this:
```elm
import Csv

let
  content = 
    "quote,character\n\"Why, hello there\",Obi-Wan Kenobi\n\"General Kenobi.\",General Grievous"
in
Csv.parseRows content --> Ok [[ "quote", "character"],["Why, hello there", "Obi-Wan Kenobi"],["General Kenobi.", "General Grievous"]]
```

Calling `Csv.parseCsv` will produce a list of lists of strings, properly escaped from their CSV representation.

