# Multilingual

This package allows you to work with text copies that can be translated in multiple langaues.

## Example

```
import Browser
import Html
import Json.Decode as Decode exposing (Error)
import Multilingual exposing (Multilingual)


type alias Model = 
  { lang : Multilingual.Code
  , copy : Result Error Multilingual
  }


type Msg 
  = NoOp


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of 
    NoOp ->
      model


view : Model -> Html Msg
view model =
  case model.copy of 
    Ok multilingual ->
      Html.div []
        [ Multilingual.print model.lang multilingual
          |> Html.map (always NoOp)
        ]
    Err reason ->
      Html.pre [] 
        [ Decode.errorToString reason |> Html.text 
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { view = view
        , update = update
        , init =
            { lang = Multilingual.Fr
            , copy =
                Decode.decodeString decode """
                {
                    "copy":"Prevedi me",
                    "translations": {
                        "en":"Translate me",
                        "fr":"Traduis-moi"
                    }
                }
            """
            }
        }
```




