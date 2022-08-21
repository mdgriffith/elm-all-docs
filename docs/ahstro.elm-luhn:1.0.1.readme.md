# elm-luhn

Validate numbers using the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). Can be used when writing e.g. validators for credit cards or other numbers that use the Luhn algorithm for basic validation.

## Installation

```sh
elm-package install ahstro/elm-luhn
```

## Usage

```elm
import Luhn

if Luhn.isValid "1234567812345670"
  "Yay"
else
  "Nay"


case Luhn.validate "1234567812345670" of
    Ok numberString ->
        numberString ++ " is valid" -- "1234567812345670 is valid"
    Err error ->
        error
```

More examples are available in the [/tests](https://github.com/ahstro/elm-luhn/tree/master/tests) folder.
