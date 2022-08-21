# Hex.Convert

`Hex.Convert`
is a small package for working with `elm/bytes`.
It exposes three functions.

- `toString : Bytes -> String`
- `toBytes : String -> Maybe Bytes`
- `blocks : Int -> String -> List String`

The `toString` function converts a `Bytes` value into
its hexadecimal representation, assuming this exists. 
For example,
something like `"6A45F2"`. The `toBytes` function converts a string like 
`"6A45F2"` to a value of type `Maybe Bytes`. Such a function
call can fail, e.g., on the input `"6A45F!"`. The `blocks` function
is useful for grouping a long string into shorter substrings of equal length.


## Examples

    Hex.Convert.toBytes "FF66"  
        |> Maybe.map Hex.Convert.toString 
    --> Just "FF66"`

    $ elm repl
    > import Hex.Convert
    > import Bytes.Encode as Encode exposing(encode)

    > encode (Encode.string "Hello") 
        |> Hex.Convert.toString
    "48656C6C6F" : String

    > Hex.Convert.toBytes "FF66" 
        |> Maybe.map Hex.Convert.toString
    Just "FF66" : Maybe String

    > Hex.Convert.toBytes "FF66!!" 
        |> Maybe.map Hex.Convert.toString
    Nothing : Maybe String

    > "abcdefghijklmnopqrstuvwx1234" 
        |> Hex.Convert.blocks 4
    ["abcd","efgh","ijkl","mnop","qrst","uvwx","1234"]
```

## Notes

The function `Hex.Convert.toBytes` is case-insensitive. Thus

    Hex.Convert.toBytes "ff66" 
        |> Maybe.map Hex.Convert.toString
    --> Just "FF66"

If you prefer lower-case output from `Hex.Convert.from`,
you can do as in this example:

    Hex.Convert.toBytes "ff66" 
        |> Maybe.map Hex.Convert.toString 
        |> Maybe.map String.toLower
    --> Just "ff66" : Maybe String

