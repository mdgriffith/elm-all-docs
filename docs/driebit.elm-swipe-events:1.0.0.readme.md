# elm-swipe-events

> Swipe events, in Elm

Adapted for Elm 0.19 from [elm-touch-events](https://github.com/zwilias/elm-touch-events).

## Usage

In your model:
```elm
    { gesture = Swipe.Gesture }
```

In your init:
```elm
    { gesture = Swipe.blanco }
```

In your Msg:
```elm
    type Msg
        = Swipe Swipe.Event
        | SwipeEnd Swipe.Event
```

In your view:
```elm
    Html.div
        [ Swipe.onStart Swipe
        , Swipe.onMove Swipe
        , Swipe.onEnd SwipeEnd
        ]
        [ Html.text "Swipe me!" ]
```

In your update:
```elm
    Swipe touch ->
        { model | gesture = Swipe.record touch model.gesture }

    SwipeEnd touch ->
        let
            gesture : Swipe.Gesture
            gesture =
                Swipe.record touch model.gesture

            -- use inspection functions like `isTap` and `isLeftSwipe`
        in
        { model | gesture = Swipe.blanco }
```

## License

BSD-3 © [Ilias Van Peer](https://ilias.xyz)
