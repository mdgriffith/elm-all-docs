# elm-combox

`elm-combox` based on elm-selectize to show dropdown with autocomplete

```elm
import Html exposing (Html)
import Html.Attributes as Attributes
import Combox

-- MODEL --
type alias Model =
    { language : Combox.Model
    }

init : ( Model, Cmd Msg )
init =
    ( { language =
          Combox.initial "id-lang" Nothing ["elm","elixir","haskell"]
      }
    , Cmd.none
    )
    
-- UPDATE --
type Msg
    = ComboxMsg Combox.Msg

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ComboxMsg selectizeMsg ->
            let
              ( language, cmd ) =
                  Combox.update selectizeMsg model.language
            in
              ({ model | language = language }, Cmd.map ComboxMsg cmd)

---- VIEW
view : Model -> Html Msg
view model =
    Html.div []
    [ Html.h3 [] [ Html.text "Dropdown Menus" ]
    , Combox.config ComboxMsg
      |> Combox.clear False
      |> Combox.options [Attributes.class "combox"]
      |> Combox.view model.language
    ]
```
