# elm-validation

`elm-validation` provides functions for validating data.

What makes this package different from the others is that you can accumulate or not accumulate errors, and use the desired data structure to store errors (e.g. List, Dict, etc.).

As a container through which the chain of calculations takes place

```elm

type Validation e r = Validation (Result e r)

```

The relatively high level of abstraction allows a wide variety of uses for this data type. For a better understanding of how to use the package, please refer to the documentation, tests or examples. The README gives a small example of how to use this package:

```elm

import Validation exposing (withValidation, pure, Validation(..))

type alias RawPerson =
  { rpFirstName : String
  , rpLastName : String
  , rpAge : String
  , rpEmail : String
  , rpIpAddress : String
  }

type alias Person =
  { vpFirstName : String
  , vpLastName : String
  , vpAge : Int
  , vpEmail : String
  , vpIpAddress : String
  }

  let
    -- For clarity, it is recommended to see the full example in the repository
    -- Validate each field to get an error or result:
    validatedFirstName = -- ...
    validatedLastName = -- ...
    validatedAge = -- ...
    validatedEmail = -- ...
    validatedIpAddress = -- ...

    validatedPerson = pure Person
      |> withValidation validatedFirstName
      |> withValidation validatedLastName
      |> withValidation validatedAge
      |> withValidation validatedEmail
      |> withValidation validatedIpAddress
  in validatedPerson

```
