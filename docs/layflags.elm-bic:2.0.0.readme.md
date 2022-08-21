# `elm-bic`

[![Build Status](https://travis-ci.org/layflags/elm-bic.svg?branch=master)](https://travis-ci.org/layflags/elm-bic)

This library is for parsing **Business Identifier Codes** (BIC) used e.g. in
banking. The implementation is based on [ISO 9362 Fourth edition 2014-12-01](https://www.iso.org/standard/60390.html)

```
Format of the BIC:
==================
PPPP CC SS BBB
  |   |  |  \___ Branch Identifier (3 alpha-numeric, optional)
  |   |  \______ Party Suffix (2 alpha-numeric)
  |   \_________ Country Code (ISO 3166-1 alpha 2)
  \_____________ Party Prefix (4 alpha-numeric)
```

## Installation

`elm install layflags/elm-bic`

## Usage

```elm
BIC.fromString "FDDO DE MM XXX" -- Ok (BIC "FDDO" Iso3166.DE "MM" Nothing)
BIC.toString bic -- "FDDODEMM"
BIC.toString11 bic -- "FDDODEMMXXX"
```

## Credits

This package uses [`rl-king/elm-iso3166-country-codes`](https://package.elm-lang.org/packages/rl-king/elm-iso3166-country-codes/2.0.0/Iso3166) for country code parsing.

## License

[BSD 3-Clause](LICENSE)
