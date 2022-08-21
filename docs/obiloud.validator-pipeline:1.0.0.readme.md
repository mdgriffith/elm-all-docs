# validator-pipeline
Build custom validators of a user input. Combine validatiors of multiple input fields with `(|>)` operator.

## Yet another validator
Form validation is very common and there is already number of different libraries to choose from: 
* [arowM/elm-from-validator](https://package.elm-lang.org/packages/arowM/elm-form-validator/latest/)
* [etaque/elm-form](https://package.elm-lang.org/packages/etaque/elm-form/latest/)
* [gage251/elm-validator-pipeline](https://package.elm-lang.org/packages/gege251/elm-validator-pipeline/latest/)
* [jaredramirez/elm-field](https://package.elm-lang.org/packages/jaredramirez/elm-field/latest/)
* [Bastes/the-validator](https://package.elm-lang.org/packages/Bastes/the-validator/latest/)

What sets this library apart from others is its intuitive interface for working with optional fields.
It is not enough to simply leave certain fields unchecked. This library exposes interface to provide default value if optional field is empty but validate the same field otherwise.

Library is very flexibile and leaves implementation of the custom validator to the developer. Validation is decoupled from any kind of representation and can be used both inside the view function and in the update function.

## Examples

### Validating a record.

```elm
import Dict exposing (Dict)
import Validator exposing (Validator)


type alias User =
    { name : String
    , age : Int
    , email : Email
    }


type Email = Email String


parseEmail : String -> Result String Email
parseEmail str =
    if String.contains "@" str then
        Ok (Email str)
    else
        Err "Invalid email"


emailValidator : Validator String (String, String) Email
emailValidator =
    Validator.custom (parseEmail >> Result.mapError (Tuple.pair "email" >> List.singleton))


intValidator : String -> Validator String (String, String) Int
intValidator fieldName =
    Validator.custom (String.toInt >> Result.fromMaybe [ (fieldName, "Not a number") ])


type alias FormValues =
    { name : String
    , age : String
    , email : String
    }


userValidator : Validator FormValues (String, String) User
userValidator =
    Validator.succeed User
        |> Validator.required .name String.isEmpty ("name", "Name is required") (Validator.custom Ok)
        |> Validator.optional .age String.isEmpty 10 (intValidator "age")
        |> Validator.required .email String.isEmpty ("email", "Email is required") emailValidator


model : FormValues
model =
    { name = "John Doe"
    , age = ""
    , email = "wrong address"
    }


validationErrors : Dict String String
validationErrors =
    case Validator.run userValidator model of 
        Ok _ ->
            Dict.empty
        Err errs ->
            Dict.fromList errs
       

Dict.get "name" validationErrors --> Nothing


Dict.get "age" validationErrors --> Nothing


Dict.get "email" validationErrors --> (Just "Invalid email")
```

### Validating a dict.

```elm
import Dict exposing (Dict)
import Validator exposing (Validator)


type alias User =
    { name : String
    , age : Int
    , email : Email
    }


type Email = Email String


parseEmail : String -> Result String Email
parseEmail str =
    if String.contains "@" str then
        Ok (Email str)
    else
        Err "Invalid email"


maybeEmailValidator : String -> Validator (Maybe String) (String, String) Email
maybeEmailValidator fieldName =
    Validator.custom(Result.fromMaybe [ ( fieldName, "Email must be a string" ) ])
        |> Validator.andThen 
            (\str -> 
                case parseEmail str of
                    Ok email ->
                        Validator.succeed email
                    Err reason -> 
                        Validator.fail ( fieldName, reason )
            )
        


maybeIntValidator : String -> Validator (Maybe String) (String, String) Int
maybeIntValidator fieldName =
    Validator.custom(Result.fromMaybe [ ( fieldName, "Must contain digits" ) ])
        |> Validator.andThen (String.toInt >> Maybe.map Validator.succeed >> Maybe.withDefault (Validator.fail ( fieldName,  "Not a number" )))


type alias FormValues =
    Dict String String


userValidator : Validator FormValues (String, String) User
userValidator =
    Validator.succeed User
        |> Validator.required (Dict.get "name") ((==) Nothing) ("name", "Name is required") (Validator.custom (Result.fromMaybe [("name", "Name is required")]))
        |> Validator.optional (Dict.get "age") ((==) Nothing) 10 (maybeIntValidator "age")
        |> Validator.required (Dict.get "email") ((==) Nothing) ("email", "Email is required") (maybeEmailValidator "email")


model : FormValues
model =
    Dict.fromList
        [ ("name", "John Doe")
        , ("email",  "wrong address")
        ]


validationErrors : Dict String String
validationErrors =
    case Validator.run userValidator model of 
        Ok _ ->
            Dict.empty
        Err errs ->
            Dict.fromList errs
       

Dict.get "name" validationErrors --> Nothing


Dict.get "age" validationErrors --> Nothing


Dict.get "email" validationErrors --> (Just "Invalid email")
```