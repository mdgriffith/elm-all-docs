# Elm RTTL

Parse ringtones written using RTTL and Nokia Composer.

## Installation

`elm install Arkham/elm-rttl`

## Example

Here's an example of what you could do:

```elm
port module Example exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events
import Json.Encode as Encode
import RTTL


port sendRingtone : Encode.Value -> Cmd msg


type alias Model =
    { userInput : String
    , alertMessage : String
    }


type Msg
    = UserInput String
    | Play


initialModel : Model
initialModel =
    { userInput = "32c2 32f2 32c2 32f2 4c2 8#g1 8#a1 4f1 8- 32c2 32f2 32c2 32f2 4c2 8#g1 8#a1 4#d2 8- 32c2 32- 32#d2 4f2 16#g2 32- 16g2 32- 32f2 32- 4#d2 8- 32c2 32f2 32c2 32f2 4c2 8#a1 4f1"
    , alertMessage = ""
    }


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( initialModel, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.textarea
            [ Attr.value model.userInput
            , Events.onInput UserInput
            ]
            []
        , Html.button [ Events.onClick Play ] [ Html.text "Play" ]
        , Html.text model.alertMessage
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UserInput newInput ->
            ( { model | userInput = newInput }, Cmd.none )

        Play ->
            case RTTL.parseComposer { tempo = 64 } model.userInput of
                Ok value ->
                    ( { model | alertMessage = Debug.toString value }
                    , sendRingtone (RTTL.encode value)
                    )

                Err _ ->
                    ( { model | alertMessage = "Could not parse ringtone, sorry!" }, Cmd.none )
```

Paired us with this HTML


```
<!DOCTYPE html>
<html>
<head>
  <script src="app.js"></script>
</head>
<body>
  <main></main>
  <script>
    var app = Elm.Example.init({ node: document.querySelector('main') })

    app.ports.sendRingtone.subscribe(function(data) {
      console.log(data);
      var context = new AudioContext();

      var ac = new AudioContext();
      var osc = ac.createOscillator();

      data.reduce(function(now, elem) {
        oscillator = context.createOscillator();
        oscillator.connect(context.destination);
        oscillator.frequency.value = elem.frequency;
        oscillator.start(context.currentTime + now);
        oscillator.stop(context.currentTime + now + elem.duration - 0.002);
        return(now + elem.duration);
      }, 0);
    });
  </script>
</body>
</html>
```
