# elm-field

This library provides a datatype to model and validate input field data

## Installation

    $ elm install jaredramirez/elm-field

## Example

To use this data type, let's say that you need a sign up form that has a requried name field,
a required email field, and an age field that must be between 18 & 100 that you need to send
to your server after it's validated.

First, you can import the package and create the fields in your model

    ... other imports
    import Field as F
    import Field.Int as FInt
    import Field.String as FStr

    type alias Model =
        { name : FStr.Field
        , email : FStr.Field
        , age : FInt.Field
        }


    init : ( Model, Cmd Msg )
    init =
        ( { name = F.init ""
          , email = F.init ""
          , age = F.init 0
          }
        , Cmd.none
        )

Then, you add a few messages to update the fields, and one to submit your form

    type Msg
        = SetNameField String
        | SetEmailField String
        | SetAgeField String
        | Submit

Next, you add logic to set & validate the fields to your update function

    update : Msg -> Model -> ( Model, Cmd Msg )
    update msg model =
        case msg of
            SetNameField value ->
                { model
                    | name =
                        value
                            |> F.resetValue model.name
                            |> validateName
                }
                    ! []

            SetEmailField value ->
                { model
                    | email =
                        value
                            |> F.resetValue model.email
                            |> validateEmail
                }
                    ! []

            SetAgeField value ->
                { model
                    | age =
                        value
                            |> String.toInt
                            |> Maybe.withDefault 0
                            |> F.resetValue model.age
                            |> validateAge
                }
                    ! []

            Submit ->
                let
                    name =
                        validateName model.name

                    email =
                        validateEmail model.email

                    age =
                        validateAge model.age

                    cmds =
                        case ( F.toResult name, F.toResult email, F.toResult age ) of
                            ( Ok nameValue, Ok emailValue, Ok ageValue ) ->
                                [ ... some command ... ]

                            _ ->
                                []
                in
                ( { model
                    | name = name
                    , email = email
                    , age = age
                  }
                , Cmd.batch cmds
                )


    validateName : FStr.ValidationFunc
    validateName =
        FStr.notEmpty


    validateEmail : FStr.ValidationFunc
    validateEmail =
        FStr.notEmpty >> FStr.email


    validateAge : FInt.ValidationFunc
    validateAge =
        FInt.greaterThanOrEqual 18 >> FInt.lessThan 100

Finally, wire it into the view!

    view : Model -> Html Msg
    view model =
        Html.div []
            [ Html.h1 [] [ Html.text "Sign Up!" ]
            , F.view (stringFieldConfig "Name" SetNameField) model.name
            , F.view (stringFieldConfig "Email" SetEmailField) model.email
            , F.view (intFieldConfig "Age" SetAgeField) model.age
            , Html.button [ Html.Events.onClick Submit ]
                [ Html.span [] [ Html.text "Submit" ] ]
            ]

    stringFieldConfig : String -> (String -> msg) -> FStr.ViewConfig msg
    stringFieldConfig title toMsg =
        { valid =
            \meta value ->
                Html.div []
                    [ Html.input
                        [ Html.Events.onInput toMsg
                        , Html.Attributes.value value
                        , Html.Attributes.disabled meta.disabled
                        ]
                        []
                    ]
        , invalid =
            \meta value errorMessage ->
                Html.div []
                    [ Html.input
                        [ Html.Events.onInput toMsg
                        , Html.Attributes.value value
                        , Html.Attributes.disabled meta.disabled
                        ]
                        []
                    , Html.span []
                        [ Html.text errorMessage ]
                    ]
        }

    intFieldConfig : String -> (String -> msg) -> FInt.ViewConfig msg
    intFieldConfig title toMsg =
        { valid =
            \meta value ->
                Html.div []
                    [ Html.input
                        [ Html.Events.onInput toMsg
                        , Html.Attributes.value (toString value)
                        , Html.Attributes.type_ "number"
                        , Html.Attributes.disabled meta.disabled
                        ]
                        []
                    ]
        , invalid =
            \meta value errorMessage ->
                Html.div []
                    [ Html.input
                        [ Html.Events.onInput toMsg
                        , Html.Attributes.value (toString value)
                        , Html.Attributes.type_ "number"
                        , Html.Attributes.disabled meta.disabled
                        ]
                        []
                    , Html.span []
                        [ Html.text errorMessage ]
                    ]
        }

In this example, we only use the built-in validators, but it's pretty
simple to create your own validators too! Take a look at [an example](https://github.com/jaredramirez/elm-field/blob/master/example/Main.elm) to see a
similar example to the one above but with a custom validator.

## Documentation

[Full Usage Documentation](http://package.elm-lang.org/packages/jaredramirez/elm-field/latest/Field)
