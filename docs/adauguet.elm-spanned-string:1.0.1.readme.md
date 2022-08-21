# elm-spanned-string

Span substrings in a given string.

## Motivation

The intention of this package it to help you span substrings in a given string. Is is a very tiny package, containing a `SpannedString` type which is a simple alias, and a `span` function.

The typical use case is rendering bold matched substrings in suggested strings during a search.

## Implementation details

The given string is first converted to a `List Char`. Characters are spanned one by one, then similar neighboors are associated to reconstruct a list of spanned strings.

## Example

Here is an example.

```elm
import SpannedString exposing (span)
import Html exposing (Html)

format : String -> List Int -> List (Html msg)
format string indices =
    span string indices
        |> List.map
            (\( string, isSpanned ) ->
                if isSpanned then
                    Html.strong [] [ Html.text string ]

                else
                    Html.text string
            )
```
