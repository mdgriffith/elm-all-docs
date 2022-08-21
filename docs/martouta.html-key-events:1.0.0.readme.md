# Html Key Events

HTML Event listeners for on 'keyup' and on 'keydown'.

For each one of them, it stops propagation.

The `onKeyUp` will give you the ASCII code of the key being released.

The `onKeyDown` will give you the ASCII code of the key being pressed. Plus, it will tell you if the `shift` key is pressed as well.

### Why this package

Event listeners on keys may be a very common usage, specially to know which keys are pressed/unpressed.
It would be nice if it was implemented inside `elm/html` in `Html.Events` just like the `onInput`, and [it seems to be in their future plants](https://package.elm-lang.org/packages/elm/html/latest/Html-Events#keyCode) as it says in the `note`, but in the meantime, this comes in handy.

### Install

Install with:
`elm install martouta/html-key-events`

### Example

A simple example of usage:
```elm
type Msg
    = KeyDown ( Int, Bool )
    | KeyUp Int

view : Html Msg
view =
    textarea
        [ rows 10
        , cols 40
        , onKeyDown KeyDown
        , onKeyUp KeyUp
        ]
        []
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        KeyDown ( code, shift ) ->
            (model, Cmd.none)

        KeyUp code ->
            (model, Cmd.none)
```

### Learn more

You can read more about custom html event decoders in [the documentation of the package elm/html](https://package.elm-lang.org/packages/elm/html/latest/Html-Events#targetValue).
