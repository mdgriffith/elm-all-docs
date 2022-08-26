# elm-dat-gui

A lightweight graphical user interface for changing variables in Elm. This package is an adaptation of of the Google Data Arts project [dat.GUI](https://github.com/dataarts/dat.gui). This library allows for projects to easily change values within a project within a discrete gui which can be collapsed to maintain a small profile, putting your project in the forefront of the web page.

## Example

For a full example check out the [example source code](https://github.com/Evelios/elm-dat-gui/blob/master/example/src/Main.elm) to see the extra information needed

```elm
import Dat

view : Model -> Html Msg
view model =
    Element.layoutWith 
        { options = [ Dat.focusStyle ] } [] <| 
        Dat.gui []
            { toggleControls = ToggleControls
            , showControls = model.showControls
            , elements =
                [ Dat.action
                    { text = "Action Button"
                    , form = Action
                    , onPress = OnChange
                    }
                , Dat.boolean
                    { text = "Boolean Box"
                    , form = Boolean
                    , onClick = OnChange
                    , checked = model.boolean
                    }
                , Dat.string
                    { text = "Text Value"
                    , form = Text
                    , onChange = OnChange
                    , value = model.text
                    }
                , Dat.integer
                    { text = "Integer"
                    , form = Integer
                    , onChange = OnChange
                    , value = model.integer
                    , min = 0
                    , max = 100
                    , step = 1
                    }
                , Dat.float
                    { text = "Float"
                    , form = Floating
                    , onChange = OnChange
                    , value = model.float
                    , min = 0
                    , max = 10
                    , step = 0.1
                    }
                ]
            }

-- Accompanying Types

type Form
    = Action
    | Boolean Bool
    | Text String
    | Integer Int
    | Floating Float

type Msg
    = ToggleControls
    | OnChange Form

type alias Model =
    { showControls : Bool
    , boolean : Bool
    , text : String
    , integer : Int
    , float : Float
    }
```