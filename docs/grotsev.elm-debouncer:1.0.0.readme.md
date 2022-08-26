# elm-debouncer

The most simple debouncer for Elm.

## Motivation

It's common to debounce user input and do some action (e.g. HTTP request) after it is settled. There are another more complex time-throttling Elm libraries. This library is the most simple one. You may understand how it's work from the first glance.

User events are pushed to `Bounce` type which counts in-flight events. Event popping is delayed. If there is no in-flight events then user value is in steady state.

## Example

First of all let's bootstrap.

```elm
module Example exposing (main)

import Bounce exposing (Bounce)
import Browser exposing (element)
import Html exposing (Html, div, input, text)
import Html.Attributes exposing (value)
import Html.Events exposing (onInput)


main =
    element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
```

Suppose, user inputs his name and we have to show its current and steady values.

```elm
type alias Model =
    { name : String
    , steadyName : String
    , bounce : Bounce
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { name = ""
      , steadyName = ""
      , bounce = Bounce.init
      }
    , Cmd.none
    )

view : Model -> Html Msg
view { name, steadyName, bounce } =
    div []
        [ input [ onInput EditMsg, value name ] []
        , text <|
            if Bounce.steady bounce then
                ""

            else
                "typing..."
        , div [] [ text ":", text name ]
        , div [] [ text ":", text steadyName ]
        ]
```

All we have to do is to handle two messages:
- user input where we `push` and `delay` second message
- and delayed message where we `pop`, check state is `steady` and send `httpRequest` when name is filled.

```elm
type Msg
    = EditMsg String
    | BounceMsg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ name, steadyName, bounce } as model) =
    case msg of
        EditMsg value ->
            ( { model
                | name = value
                , bounce = Bounce.push bounce
              }
            , Bounce.delay 1000 BounceMsg
            )

        BounceMsg ->
            let
                newBounce =
                    Bounce.pop bounce
            in
            ( { model
                | bounce = newBounce
                , steadyName =
                    if Bounce.steady newBounce then
                        name

                    else
                        steadyName
              }
            , if Bounce.steady newBounce && not (String.isEmpty name) then
                httpRequest name

              else
                Cmd.none
            )
```

HTTP request is stubbed.

```elm
httpRequest : String -> Cmd Msg
httpRequest name =
    Debug.log ("Send HTTP request:" ++ name) Cmd.none


```
