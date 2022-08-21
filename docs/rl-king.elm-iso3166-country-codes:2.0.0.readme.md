# elm-iso3166-country-codes

Convert to and from alpha2, alpha3, numeric codes and translate into 23 languages.

``` elm
import Iso3166
import Iso3166.Dutch

twoLetterCode : String
twoLetterCode =
    Iso3166.toAlpha2 Iso3166.NL
--> "nl"

threeLetterCode : String
threeLetterCode =
    Iso3166.toAlpha3 Iso3166.NL
--> "nld"

numericCode : String
numericCode =
    Iso3166.toNumeric Iso3166.NL
--> 528

translated : String
translated =
    Iso3166.Dutch.toName Iso3166.NL
--> "Nederland"
```

## Asset size
Note that using this package might increase asset size a quite a bit.
Using `toAlpha2` and one `toName` adds about 2kB to a uglified + gzipped js file.

It's just data and this might not be required to be bundled and could easily be fetched over http.

## Credits

All modules are generated with data provided by [stefangabos/world_countries](https://github.com/stefangabos/world_countries)
a repository sourcing the codes and translations from [Wikipedia](https://en.wikipedia.org/wiki/ISO_3166-1).
