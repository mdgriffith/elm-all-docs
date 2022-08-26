# elm-number-to-words

This package provides utility functions for converting numbers to their written form.

## Installation

```
elm install carmonw/elm-number-to-words
```

## Usage

### Converting An Int To Its Written Form

```elm
import NumberToWords

NumberToWords.intToWords 1255 == "one thousand, two hundred fifty-five"
```

### Converting A Float To Its Written Form

```elm
import NumberToWords

NumberToWords.roundToWords 1232551.50 == "one million, two hundred thirty-two thousand, five hundred fifty-two"
NumberToWords.floorToWords 1255.20 == "one thousand, two hundred fifty-five"
NumberToWords.ceilingToWords 1255.20 == "one thousand, two hundred fifty-six"
```
