# elm-scroll-to

A simple library that will scroll to a position in an animated way.

```
elm install simplystuart/elm-scroll-to
```

## Setup

1. Init a `ScrollTo.Status` in your model with `ScrollTo.init`
2. Update `ScrollTo.Msg` messages with `ScrollTo.update`
3. Subscribe to `ScrollTo.Msg` messages with `ScrollTo.subscriptions`
4. Run a `ScrollTo.toPosition` command

## Scroll Animations

**Default animation:**

- 0ms delay
- 1000ms duration
- Linear easing function

**Customize animations with:**

```elm
withDelay : Float -> Status -> Status
withDuration : Float -> Status -> Status
withEasing : (Float -> Float) -> Status -> Status
```

## Basic Example

```elm
-- MODEL


type alias Model =
    { scroll : ScrollTo.Status }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { scroll = ScrollTo.init }, Cmd.none )



-- UPDATE


type Msg
    = ClickScrollToTop
    | ScrollMsg ScrollTo.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ClickScrollToTop ->
            ( model
            , Cmd.map ScrollMsg <|
                ScrollTo.toPosition { x = 0, y = 0 } model.scroll
            )

        ScrollMsg scrollMsg ->
            Tuple.mapBoth (\status -> { model | scroll = status })
                (Cmd.map ScrollMsg)
                (ScrollTo.update scrollMsg model.scroll)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    ScrollTo.subscriptions ScrollMsg model.scroll
```

### More Examples

```bash
git clone https://github.com/simplystuart/elm-scroll-to.git
cd elm-scroll-to
elm reactor
open http://localhost:8000/examples
```
