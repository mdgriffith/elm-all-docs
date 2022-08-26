# Modulus 10

The Modulus 10 algorithm is used to detect accidental input errors in digit sequences such as credit card numbers and bank account numbers.

Check out the [wikipedia article](https://en.wikipedia.org/wiki/Luhn_algorithm) for more info.


## Usage

```elm
import Mod10

checkDigit : Result Mod10.Error Int
checkDigit =
    Mod10.calculateCheckDigit [1, 2, 3]

isValid : Result Mod10.Error Bool
isValid =
    Mod10.hasValidCheckDigit [1, 2, 3, 0]
```
