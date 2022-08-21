# A state machine to handle forms in elm.

```
elm install cedricss/elm-form-machine
elm install rtfeldman/elm-validate
```

```elm
import Form.Machine
import Request
import Robot


type CustomEvents
    = ActivateHyperJump
    | DeactivateHyperJump


type alias State =
    Form.Machine.State Robot Robot.FormField


type alias Event =
    Form.Machine.Event Robot Robot.FormField CustomEvents


init : State
init =
    Unloaded


perform : CustomEvents -> State -> ( State, Cmd msg )
perform event state =
    case ( event, state ) of
        ( ActivateHyperJump, _ ) ->
            ( Displaying { robot | hyperJump = Activated  }
            , Cmd.none
            )

        ( DeactivateHyperJump, _ ) ->
            ( Displaying { robot | hyperJump = Deactivate  }
            , Cmd.none
            )


updateRobotField : Robot -> Robot.FormField -> Robot
updateRobotField robot field =
    case field of
        Robot.FieldName name ->
            { robot | name = name }

        Robot.FieldPlanet planet ->
            { robot | planet = planet }


robotValidator : Validate.Validator ( Robot.FormField, String ) Robot
robotValidator =
    Validate.all
        [ Validate.ifBlank .name ( Robot.FieldName "", "Please provide a name" ) ]


transition : Event -> State -> Context -> ( State, Cmd msg )
transition event state context =
    Form.Machine.transition
        { badTransition = logBadRobotFormTransition
        , default = defaultRobot
        , perform = perform
        , save = Request.saveRobot context.apiEndpoint SavedRobot
        , update = updateRobotField
        , validator = robotValidator
        }
        event
        state
```

## Links

- [package.elm-lang.org/packages/cedricsoulas/elm-form-machine/latest](https://package.elm-lang.org/packages/cedricss/elm-form-machine/latest)
- [cedricsoulas.com/elm](https://cedricsoulas.com/elm)
