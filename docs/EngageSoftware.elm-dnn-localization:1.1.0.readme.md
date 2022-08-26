# elm-dnn-localization

Helpers for working with Engage's DNN localization.

To get started, decode an array of objects into a `Localization` value (which is just an alias for `Dict String String`).

```elm
import Dict
import Engage.Localization as Localization exposing (Localization)
import Json.Decode as Decode

localizationJson : String
localizationJson = """
    [
        { "key": "FirstName.Text", "value": "First Name:" },
        { "key": "LastName.Text", "value": "Last Name:" }
    ]
    """

myLocalization : Localization
myLocalization =
    case localizationJson |> Decode.decodeString Localization.decoder of
        Ok localization ->
            localization
        Err _ ->
            Dict.empty

type alias MyModel =
    { localization: Localization
    }

myModel : MyModel
myModel = MyModel myLocalization

Localization.localizeString "FirstName.Text" myModel
--> "First Name:"
```
