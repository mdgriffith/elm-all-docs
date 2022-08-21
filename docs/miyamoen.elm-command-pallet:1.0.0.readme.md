# Command Pallet

![](https://i.gyazo.com/7ac8a39c5b528b6115f6e0c366babcfc.gif)

This package is TEA component. A Command pallet is a `Msg` selector like Atom, VSCode, Sublime Text 3 and so on...

[sample](https://github.com/miyamoen/elm-command-pallet/blob/master/src/Sample.elm)


# How to use

First, `init` command pallet and put it into your `Model`.


```elm
init : ( Model, Cmd Msg )
init =
    ( { commandPallet =
            CommandPallet.init CommandPalletMsg
                [ ( "Increment", Increment )
                , ( "Decrement", Decrement )
                ]
      , ...
      }
    , Cmd.none
    )
```

Second, use `update` in your `update`.

```elm
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CommandPalletMsg subMsg ->
            let
                ( cp, cmd ) =
                    CommandPallet.update subMsg model.commandPallet
            in
                ({ model | commandPallet = cp }, cmd)

        ...

```

Third, startup a command pallet. Type `p` key to startup with default.

```elm
subscriptions : Model -> Sub Msg
subscriptions { commandPallet } =
    CommandPallet.subscriptions commandPallet
```

Last, command pallet view in your view function.

```elm
view : Model -> Html Msg
view { commandPallet, ... } =
    div []
        [ CommandPallet.html commandPallet
        , p []
            [ button [] [ text "<" ]
            , text <| String.fromInt num
            , button [] [ text ">" ]
            ]
        ]
```
