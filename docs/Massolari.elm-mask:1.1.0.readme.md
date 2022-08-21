# elm-mask

A simple way to apply a mask on your string

## Example

```elm
import Mask
import Html exposing (input)
import Html.Attributes exposing (value)
import Html.Events exposing (onInput)

type Msg
    = InputtedPhone String

type alias Model =
    { phone : String
    -- ...
    }

update : Msg -> Model -> Model
update msg model =
    case msg of
        InputtedPhone phone ->
            { model | phone = Mask.number "(###) ###-####" phone }

view : Model -> Html msg
view model =
    input
        [ value model.phone
        , onInput InputtedPhone
        ]
        []
```
