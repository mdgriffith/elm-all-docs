# Splat

## Introduction
This package provides functions analogous to the "splat" operator in other
languages, unpacking list elements into function arguments. All arguments must
be of the same type, given that lists cannot contain disparate types.


## Functions

### splat2 : (a -> a -> b) -> List a -> Maybe b

Unpack the first 2 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 2 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 2 arguments, the result will be a partially applied form of the
function wrapped in `Just`.

Example:

```
splat2 String.append [ "butter", "fly" ] == Just "butterfly"
```

### splat3 : (a -> a -> a -> b) -> List a -> Maybe b

Unpack the first 3 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 3 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 3 arguments, the result will be a partially applied form of the
function wrapped in `Just`.

Example:

```
splat3 String.replace [ ",", "/", "a,b,c,d,e" ] == Just "a/b/c/d/e"
```

### splat4 : (a -> a -> a -> a -> b) -> List a -> Maybe b

Unpack the first 4 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 4 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 4 arguments, the result will be a partially applied form of the
function wrapped in `Just`.

### splat5 : (a -> a -> a -> a -> a -> b) -> List a -> Maybe b

Unpack the first 5 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 5 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 5 arguments, the result will be a partially applied form of the
function wrapped in `Just`.

### splat6 : (a -> a -> a -> a -> a -> a -> b) -> List a -> Maybe b

Unpack the first 6 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 6 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 6 arguments, the result will be a partially applied form of the
function wrapped in `Just`.

### splat7 : (a -> a -> a -> a -> a -> a -> a -> b) -> List a -> Maybe b

Unpack the first 7 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 7 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 7 arguments, the result will be a partially applied form of the
function wrapped in `Just`.

### splat8 : (a -> a -> a -> a -> a -> a -> a -> a -> b) -> List a -> Maybe b

Unpack the first 8 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 8 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 8 arguments, the result will be a partially applied form of the
function wrapped in `Just`.

### splat9 : (a -> a -> a -> a -> a -> a -> a -> a -> a -> b) -> List a -> Maybe b

Unpack the first 9 elements of a list as function arguments. Returns the
result as `Maybe`, with `Nothing` if the list is shorter than 9 elements or
`Just result` if the list could be unpacked successfully. If the function
takes more than 9 arguments, the result will be a partially applied form of the
function wrapped in `Just`.
