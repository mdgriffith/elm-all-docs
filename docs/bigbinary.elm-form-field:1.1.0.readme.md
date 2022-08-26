# Field

A `Field` is a simple data type that helps capture and validate form data better.
The left side of a field represents a function that takes in a value of arbitrary type,
validates it and returns a `ValidationResult`.

The `ValidationResult` can contain the value of the field if the validation `Passed`, or
an error if the validation `Failed`

## Example

Assume that we have a form with name, email and phone as inputs.
Then we can define these as `Field`s as follows

```elm

import Field exposing (..)
import Field.ValidationResult exposing (..)

type alias Model =
    { name : Field String String
    , email : Field String String
    , phone : Field String String
    }
```

The left `String` of a `Field` refers to the error and the right `String` refers to the actual value type

We can initialize these as follows

```elm
init =
    { name = Field validateEmpty ""
    , email = Field (validateEmpty >> andThen validateEmail) ""
    , phone = Field validateNumbersOnly ""
    }
```

The `Field` constructor takes two arguments. The first one is a validation function which takes in value of the field and produces a `ValidationResult` type

```elm
validateEmpty : String -> ValidationResult String String
validateEmpty s =
    case s of
        "" ->
            Failed "Field cannot be empty"

        _ ->
            Passed s
```

Validate a `Field` using the `validate` function.

Example of a `Passed` validation:

```elm

name = Field validateEmpty "John Doe"

nameValidationResult = validate name

-- nameValidationResult == Passed "John Doe"
```
Example of a `Failed` validation:

```elm

email = Field validateEmpty ""

emailValidationResult = validate email

-- emailValidationResult == Failed "Field cannot be empty"
```

Refer [example](https://github.com/bigbinary/elm-form-field/blob/master/examples/Form.elm)
for more


## Documentation

Refer documentation [here](http://package.elm-lang.org/packages/bigbinary/elm-form-field/latest)

## About BigBinary

![BigBinary](https://raw.githubusercontent.com/bigbinary/bigbinary-assets/press-assets/PNG/logo-light-solid-small.png?raw=true)

elm-reader is maintained by [BigBinary](https://www.BigBinary.com). BigBinary is a software consultancy company. We build web and mobile applications using Ruby on Rails, React.js, React Native and Elm.
