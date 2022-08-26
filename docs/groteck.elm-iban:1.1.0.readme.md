# WARNING
This is a fork to release the package in elm 0.19 the original work is from https://github.com/primait/elm-iban

I also update the license on the elm.json since the File allocated on the package was MIT.

# Iban Validator

This small library started out as a module for an IBAN form validator.

Now it can parse a string to an `IBAN` object, that contains the
`Country`, the `CheckCode` and the `BBAN`.

Actually CheckCode and BBAN are aliases for Strings.

### Parse an IBAN

```elm
> import IBAN
> IBAN.fromString "BE68539007547034"
Ok (IBAN Belgium "68" "539007547034")
    : Result.Result IBAN.Types.Error IBAN.Types.IBAN
```

the `fromString` function performs validation as well, it checks the
the IBAN length, according to the country code,
and performs the sanity check pass
(see https://en.wikipedia.org/wiki/International_Bank_Account_Number#Validating_the_IBAN)

#### Errors

the `fromString` function returns a `Result Error IBAN`, where `Error`
can be

1. invalid iban length according to the country
1. the string contains invalid charactes
1. the sanity check failed
1. the country code is unknown


### Show an IBAN

The library converts back the IBAN code in 2 string representations:

1. textual, it is expressed in groups of four characters separated by a single space
1. electronic without spaces

``` elm
> import IBAN
> import IBAN.Types exposing (..)
> IBAN.toString Textual (IBAN Belgium "68" "539007547034")
"BE68 5390 0754 7034" : String
>
> IBAN.toString Electronic (IBAN Belgium "68" "539007547034")
"BE68539007547034" : String
```


## Test


to run the tests

```
$ elm test
```
