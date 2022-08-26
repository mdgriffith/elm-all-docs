# elm-keyboard

`decoder` decodes which `Key` triggered an event (such as a press), independent of what keyboard layout the user is using. This is useful if you want to set the controls in a game, or a shortcut in a web app.

## Example

    import Browser
    import Browser.Events
    import Json.Decode
    import Keyboard

    main = Broswer.element
        { init = init
        , view = Debug.todo "view"
        , subscriptions = subscriptions
        , update = update
        }

    type alias Model =
        { x : Int
        , y : Int
        }

    init : flags -> (Model, Cmd Msg)
    init _ =
        ( { x = 0, y = 0 }
        , Cmd.none
        )

    type Msg
       = KeyDown Keyboard.Key

    subscriptions : Model -> Sub Msg
    subscriptions _ =
        Platform.Sub.batch <|
        [ Browser.Events.onKeyDown (Json.Decode.map KeyDown Key.decoder)
        ]

    update : msg -> model -> ( model, Cmd msg )
    update msg model =
        case msg of
            Keydown key ->
                case key of
                    Keyboard.W -> ({ model | y = model.y - 1 }, Cmd.none)
                    Keyboard.A -> ({ model | x = model.x - 1 }, Cmd.none)
                    Keyboard.S -> ({ model | y = model.y + 1 }, Cmd.none)
                    Keyboard.D -> ({ model | x = model.x + 1 }, Cmd.none)
                    _ -> (model, Cmd.none)
