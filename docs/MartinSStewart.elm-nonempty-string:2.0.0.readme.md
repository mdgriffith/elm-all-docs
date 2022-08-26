# String.Nonempty for Elm

A string that is known at compile time to have at least one character in it.

### Basic usage
```elm
import String.Nonempty exposing (..)

text : NonemptyString
text = NonemptyString 'H' "ere's some nonempty text"

text2 : Maybe NonemptyString
text2 = fromString "More text"

singleSpace : NonemptyString
singleSpace = fromChar ' '

value : NonemptyString
value = fromInt 2
```

This package copies the String core package where it makes sense. 
It also provides `toNonemptyList` and `fromNonemptyList` so you can easily convert between nonempty strings and nonempty lists defined in `mgold/elm-nonempty-list`.

## Credits

Much of the documentation is copied from the String core package and `mgold/elm-nonempty-list`.
Thank you Evan and mgold!

