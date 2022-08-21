# elm-list-date

Sometimes an API returns a List of Int's and you have to deal with it. This
package helps with the conversion from and to elm's native [`Time`](https://package.elm-lang.org/packages/elm/time/1.0.0/).

## Installation

```bash
elm install brianvanburken/elm-list-date
```

## Usage

See [docs](https://package.elm-lang.org/packages/brianvanburken/elm-list-date/latest).

### Decoding

```elm
listToDate Time.utc [ 2018, 5, 31, 15, 16, 20, 987 ] -- Ok (Posix 1527779780987)
```

### Encoding

```elm
dateToList Time.utc (Posix 1527779780987) -- [ 2018, 5, 31, 15, 16, 20, 987 ]
```
