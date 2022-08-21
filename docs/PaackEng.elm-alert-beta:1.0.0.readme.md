### As this project uses bootstrap look and feel, you have to use the bootstrap

#### See an example:

```elm
    type alias Model =
        { alerts : Alert.State }

    type Msg
        = ShowAlert
        | AlertMsg Alert.Msg

    view : Model -> Html Msg
    view model =
        div []
            [ button [ onClick ShowAlert, class "btn btn-success" ] [ text "Hit me!" ]
            , Html.map AlertMsg (Alert.view model.alerts)
            ]

    update : Msg -> Model -> ( Model, Cmd Msg )
    update msg model =
        case msg of
            ShowAlert ->
                let
                    ( alerts, cmd ) =
                        Alert.success "Hello, nice to meet you!" model.alerts
                in
                    { model | alerts = alerts } ! [ Cmd.map AlertMsg cmd ]

            AlertMsg subMsg ->
                let
                    ( alerts, cmd ) =
                        Alert.update subMsg model.alerts
                in
                    { model | alerts = alerts } ! [ Cmd.map AlertMsg cmd ]

    main : Program Never Model Msg
    main =
        Html.program
            { init = { alerts = Alert.initState } ! []
            , view = view
            , update = update
            , subscriptions = always Sub.none
            }
```
