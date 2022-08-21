# gen-garden

A generative art framework written in Elm.

`GenGarden` will render a draw function and display sliders to change user-provided variables.  

View [an example here](https://johncrane.gitlab.io/gengarden-lines/). 


## Adding GenGarden to your app

Include a `GenGarden.Model` in your app's model. 
```elm
type alias Model =
    { garden : GenGarden.Model
    }
```

Define a `Msg` type that contains a `GenGarden.Msg`.

```elm
type Msg
    = GardenMsg GenGarden.Msg
```

Use `GenGarden`'s `init`, `subscriptions`, `update`, and `view` functions to integrate into your app. 

```elm
main =
    Browser.document
        { init = init
        , subscriptions = subscriptions
        , update = update
        , view = view
        }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { garden = GenGarden.init 0 []
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ GenGarden.subscriptions model.garden
            |> Sub.map GardenMsg
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GardenMsg gMsg ->
            let
                ( gModel, cmd ) =
                    GenGarden.update gMsg model.garden
            in
            ( { model | garden = gModel }
            , Cmd.batch
                [ Cmd.map GardenMsg cmd
                ]
            )

view : Model -> Document Msg
view model =
    { title = "Gen Garden"
    , body =
        GenGarden.view drawFrame model.garden
            |> List.map (Html.map GardenMsg)
    }
```

Finally provide a draw function to be passed to `GenGarden.view`.
```elm
{-| Redraw the image area on each frame
-}
drawFrame : Dict.Dict String Float -> Float -> List (GenGarden.Drawing msg)
drawFrame _ frameNumber =
    [ GenGarden.circle ( 0, 0 ) 10 "coral [] []
    ]
```


## Drawing -- How to draw your GenGarden

Drawing coordinates are expressed as a tuple of floats, (x, y). The (0, 0) coordinate is at the center of the drawing area. The drawing area is 200 units high by 200 wide. 

`GenGarden` provides `circle`, `ellipse`, `line`, and `rect` functions to draw with. Each function returns a "drawing". Each drawing can have children drawings. `Svg.Attributes` can be added to each drawing to allow transforms and other visual specifications. Attributes are inherited from parent drawings. 

`grid` will display the x and y axes. 

The drawing function is passed via `Gengarden.view`. Example:

```elm
drawFrame : List GenGarden.Slider -> Float -> List (GenGarden.Drawing msg)
drawFrame settings frame =
    GenGarden.circle ( -5, -5 ) 20 "red" [] []
        :: GenGarden.grid
        
view : Model -> Document Msg
view model =
    { title = "Gen Garden"
    , body =
        GenGarden.view drawFrame model.garden
            |> List.map (Html.map GardenMsg)
    }
```


## Sliders - Adding runtime variables to your drawing

You can add sliders to change variables to the runtime drawing. For each variable define a `GenGarden.Slider`. Pass a list of slider definitions to `GenGarden.init`. Example:

```elm
mySliders : List GenGarden.Slider
mySliders =
    [ { label = "Length of lines"
      , max = 100
      , min = 1
      , step = 1
      , value = 50
      }
    , { label = "Circle radius"
      , max = 99
      , min = 0
      , step = 1
      , value = 50
      }
    , { label = "Circle alpha"
      , max = 1.0
      , min = 0.0
      , step = 0.05
      , value = 0.7
      }
    ]
    
init : () -> ( Model, Cmd Msg )
init _ =
    ( { garden = GenGarden.init 0 mySliders
      }
    , Cmd.none
    )
```

The current slider values are passed to the draw function as a dictionary. The label of the slider serves as the key to the dictionary values. Example:

```elm
drawFrame : Dict.Dict String Float -> Float -> List (GenGarden.Drawing msg)
drawFrame settings frameNumber =
    let
        x =
            Dict.get "Length of lines" settings |> withDefault 50

        r =
            Dict.get "Circle radius" settings |> withDefault 30

        color =
            "rgba(50,250,50,"
                ++ String.fromFloat (Dict.get "Circle alpha" settings |> withDefault 0.5)
                ++ ")"
    in
    [ GenGarden.line ( x * -1, x * -1 ) ( x, x ) "red" [] []
    , GenGarden.circle ( 0, 0 ) r color [] []
    , GenGarden.line ( x * -1, x ) ( x, x * -1 ) "coral" [] []
    ]
```
