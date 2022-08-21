# elm-sms-length lib

[![Build Status](https://travis-ci.org/alma/elm-sms-length.svg?branch=main)](https://travis-ci.org/alma/elm-sms-length)


## Example

```elm
import SmsLength

SmsLength.charsUsed "Hello World!"
12

SmsLength.charsInSms "Hello World!"
160

SmsLength.numberOfSms <| String.repeat 160 "H"
1

SmsLength.numberOfSms <| String.repeat 161 "H"
2

SmsLength.charsUsed "Hello World 🎅"
14

SmsLength.charsInSms "Hello World 🎅"
70

SmsLength.numberOfSms "Hello World 🎅"
1

SmsLength.numberOfSms <| String.repeat 70 "🎅"
1

SmsLength.numberOfSms <| String.repeat 71 "🎅"
2
```

## Contributing

We're happy to receive any feedback and ideas for about additional features.
Any input and pull requests are very welcome and encouraged. If you'd like to
help or have ideas, get in touch with us on github by opening an issue!
