# Is this password known?

This elm package checks a given password against the public API of haveibeenpwned.com

## Usage

```elm
requestPassword: String -> Cmd Msg
requestPassword pass =
    pass
        |> hashAndCut
        |> Debug.log "This will be sent to HaveIBeenPawned.com"
        |> requestPossibleMatches
        |> Http.send PasswordResponse
```

```elm
update msg model =
    case msg of
        SetPassword pass ->
            ( { model | password = pass }, Cmd.none )

        CheckPassword ->
            ( model, requestPassword model.password )

        PasswordResponse (Ok resp) ->
                    ( { model
                        | isPasswordKnown =
                            Just (isPasswordKnown model.password resp)
                    }
                    , Cmd.none
                    )
```
