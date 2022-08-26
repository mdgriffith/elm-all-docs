# elm-validation

A library for building basic [`Validation`](http://package.elm-lang.org/packages/ozmat/elm-validation/latest/Validation#Validation) in Elm

[![Build Status](https://travis-ci.org/ozmat/elm-validation.svg?branch=master)](https://travis-ci.org/ozmat/elm-validation)

## Motivation

It's common to use a "validation type" to be able to represent a failed or
a successful state, usually containing either the error or the result.

For a basic usage, we would use an Either :

```elm
type Either a b
    = Left a
    | Right b
```

Or a [`Result`](http://package.elm-lang.org/packages/elm-lang/core/latest/Result#Result) :

```elm
type Result error value
    = Ok value
    | Err error
```

But sometimes we need more than just the basics (accumulate errors,
specific map/chain).

## Basic example

Here is a basic validation example, validating non-empty `String` :

```elm
import Validation exposing (Validation, validation)


type MyError
    = EmptyString


validationFunction : String -> Validation MyError String
validationFunction =
    validation EmptyString (not << String.isEmpty)


validationFunction ""   -- Failure (Error EmptyString)

validationFunction "dd" -- Success "dd"
```

## Advanced example

In this example we want a validation function that makes sure that a `String`
input can be cast into an `Int` that is >= 1, <= 12 and divisible by 3.

Then we want a function that takes 4 `String` and try to construct (= validates)
a record type alias `Output`.

```elm
import Validation exposing (Validation, success, failure, andMapAcc)


type MyError
    = NotInt
    | LessThan1
    | GreaterThan12
    | NotDivisibleBy3


validationFunction : String -> Validation MyError Int
validationFunction s =
    case String.toInt s of
        Err _ ->
            failure NotInt

        Ok i ->
            if i < 1 then
                failure LessThan1
            else if i > 12 then
                failure GreaterThan12
            else if (i % 3) /= 0 then
                failure NotDivisibleBy3
            else
                success i


type alias Output =
    { a : Int
    , b : Int
    , c : Int
    , d : Int
    }


validateOutput : String -> String -> String -> String -> Validation MyError Output
validateOutput s1 s2 s3 s4 =
    success Output
        |> andMapAcc (validationFunction s1)
        |> andMapAcc (validationFunction s2)
        |> andMapAcc (validationFunction s3)
        |> andMapAcc (validationFunction s4)


validateOutput "notint" "0" "7" "13" -- Failure (ErrorList [GreaterThan12,NotDivisibleBy3,LessThan1,NotInt])

validateOutput "3" "6" "9" "12"      -- Success { a = 3, b = 6, c = 9, d = 12 }
```

If you want to see another example, have a look at [elm-forms](http://package.elm-lang.org/packages/ozmat/elm-forms/latest/) ([source code](https://github.com/ozmat/elm-forms)).
