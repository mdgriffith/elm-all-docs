# Phace

 A *phace* is an [identicon](https://en.wikipedia.org/wiki/Identicon) styled to look like a face. This package generates phaces from [elm-ethereum](https://package.elm-lang.org/packages/cmditch/elm-ethereum/latest/) addresses or hexadecimal strings.

 ![alt text](https://raw.githubusercontent.com/coinop-logan/phace/master/demo/screenshots/12-cute-phaces.png "12 Cute Phaces")

Each character in the provided string or address is interpreted as a hex value (0-15), then used to generate colors and points. The algorithm consumes characters from both ends of the string (face/eyes/mouth from the beginning, hair from the end). In the end, 34 characters are consumed. In the case of an Ethereum address, this leaves 6 characters near the middle of the string unused.