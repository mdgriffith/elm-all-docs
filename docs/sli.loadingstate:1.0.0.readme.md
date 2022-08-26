# LoadingState

A simple convenience type for tracking the loading state of an external
resource.

### Usage Example

```elm
type alias Model =
    { username : String
    , password : String
    , loggingIn : LoadingState Http.Error ()
    }


type Msg
    = Username String
    | Password String
    | SendLogin
    | RecievedLogin (Result Http.Error Token)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        -- Snipped form handling code

        SendLogin ->
            let
                body =
                    encodeLogin model
                        |> Http.jsonBody
            in
            ( model
              -- Or however you send a request.
            , Api.login
                model.username
                model.password
                RecievedLogin
            )

        RecievedLogin result ->
            case result of
                Ok token ->
                    ( { model | loggingIn = Loaded () }, Api.storeToken token )

                Err err ->
                    ( { model | loggingIn = Failed err }, Cmd.none )
```

And then later in your view somewhere:

```elm
case model.loggingIn of
    Loading ->
        div [] [ text "Logging in..." ]

    Loaded _ ->
        div [] [ text "Logged in successfully." ]

    Failed err ->
        div [] [ text "Login failed." ]

    NotLoading ->
        div [] []
```