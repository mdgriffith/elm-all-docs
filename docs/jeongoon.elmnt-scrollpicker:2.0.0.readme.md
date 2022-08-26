[setOptions]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#setOptions
[initMinimalState]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#initMinimalState
[setScrollStopCheckTime]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#setScrollStopCheckTime
[subscriptionsWith]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#subscriptionsWith
[defaultTheme]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#defaultTheme
[MinimalState]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#MinimalState
[Option]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#Option
[Msg]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#Msg
[anyNewOptionSelected]: /packages/jeongoon/elmnt-scrollpicker/latest/Elmnt-BaseScrollPicker#anyNewOptionSelected
[exampleUrl]: https://jeongoon.github.io/examples/7Dec2021.BaseScrollPicker.html

# An Elm-Ui friendly Scroll Picker

`elmnt-scrollpicker` provides an scroll picker with some animation. `elmnt`
is stands for [`Element`](https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/)
so you can use the View(widget) as an element in elm-ui.

[See it in action here.][exampleUrl]

# Usage

This is low level module, So let me examplain fully. however If you are familiar
with other *Elm architecture* style module, it is easier. Or you have
chance to get used to it.

## Import

```elm
import Element exposing (..)
import Dict exposing (Dict)
                     -- ^ options are stored in Dict
import Elmnt.BaseScrollPicker as ScrollPicker
                                 -- ^ or as you'd like
```

## Make your own Model and Msg

```elm
type AppMsg
     = ScrollPickerMessage String
       (ScrollPicker.Msg Int AppMsg)
```

ScrollPicker.Msg type involves the type of Your own message (AppMsg)
and also the type of options that we'd like to pick from.
`Int` is used for [`Option`][Option] in this case.

Some states of picker are required to store in internal record.
you might need to declare your own message wrapper
constructor *ScrollPickerMessage* is an wrapper constructor (or map function) to
create messages which is compatible to your own module message.


Let's say we are making a simple time picker, we need two seprate
pickers for hour and minute value. If you want a Dict or List
go for it!


```elm
type alias Model -- which is your own model
    = { firstPickerState
         : ScrollPicker.MinimalState Int AppMsg
      , secondPickerState
         : ScrollPicker.MinimalState Int AppMsg
      , messageMapWith
         : String -> (ScrollPicker.Msg Int AppMsg) ->
           AppMsg
      , pickerDirection
         : ScrollPicker.Direction -- Horizontal or Vertical
      }
```


## Model

[`MinimalState`][MinimalState] shows the minimal states required to work
as a scroll picker. And even if you put *more* fields in your record,
all the function will still works with yours. Because the most of API
use partial record annotation.

For example [`setOptions`][setOptions] function has the definition like below.

```elm
setOptions
    : (vt -> String) -> -- vt stands for 'value type'
      List (vt, Element msg) ->
      { state |
        idString  : String
      , optionIds : List String
      , optionIdToRecordDict : Dict String
                               (Option vt msg)
      } -> -- At least, those fields are required
           -- in the state record
      { state |
        idString  : String
      , optionIds : List String
      , optionIdToRecordDict : Dict String
                               (Option vt msg)
      } --> will return the same structure of
        --  the state record
  ```

which makes setOptions can be provided with a subset of MinimalState.


## Init
Let's initialise our example model. Each picker model(or state) could be
initialised with functions such as [`initMinimalState`][initMinimalState],
[`setOptions`][setOptions] and [`setScrollStopCheckTime`][setScrollStopCheckTime]


```elm
exampleInit : () -> ( Model, Cmd AppMsg )
exampleInit flags
    = ( { firstPickerState -- for hour value
              = ScrollPicker.initMinimalState
                "firstScrollPicker" -- id
              |> ScrollPicker.setOptions
                 (String.fromInt)
                 (List.range 1 12
                    |> List.map
                       ( \n ->
                            ( n
                            , n
                              |> ( String.fromInt >> text )
                            )
                       )
                 )
              |> ScrollPicker.setScrollStopCheckTime 75
                 -- ^ a bit more quicker to check

        , secondPickerState -- for minute value
              = ScrollPicker.initMinimalState
                "secondScrollPicker"
              |> ScrollPicker.setOptions
                 (String.fromInt)
                 (List.range 0 59
                    |> List.map
                       ( \n ->
                           ( n
                           , n
                             |> ( String.fromInt
                                    >> String.padLeft 2 '0'
                                    >> text
                                )
                           )
                       )
                 )

        , messageMapWith
            = ScrollPickerMessage
          -- ^ a map function to wrap the picker messages
          --   into the Msg

        , pickerDirection
            = ScrollPicker.Vertical
        }              
```

## Update

In your own update function, you might need to check picker Id and update
the matched picker state(or model) accordingly.

```elm
exampleUpdate : AppMsg -> Model ->
                ( Model, Cmd AppMsg )
exampleUpdate msg model
    = let update
              = ScrollPicker.updateWith model
      in
      case msg of
          ScrollPickerMessage idString pickerMsg ->
              case idString of
                  "firstScrollPicker" ->
                      let ( firstPickerState, cmd )
                              = update pickerMsg
                                  model.firstPickerState

                          newModel
                              = { model |
                                  firstPickerState
                                      = firstPickerState
                                }
                              
                      in ( case ScrollPicker.anyNewOptionSelected
                                  pickerMsg of

                               Just option ->
                                   { newModel |
                                     hourValue
                                         = option.value
                                   }
                               Nothing ->
                                   newModel
                           , cmd
                         )

                  "secondScrollPicker" ->
                      let ( secondPickerState, cmd )
                              = update pickerMsg
                                  model.secondPickerState

                          newModel
                              = { model |
                                  secondPickerState
                                      = secondPickerState
                                }
                              
                      in ( case ScrollPicker.anyNewOptionSelected
                                  pickerMsg of

                               Just option ->
                                   { newModel |
                                     minuteValue
                                        = option.value
                                   }
                               Nothing ->
                                   newModel
                           , cmd
                         )

                  _ ->
                      ( model, Cmd.none )
```

And picker model itself *does not* hold selected option, you also need to
check some message [`Elmnt.BasePickerState.ScrollPickerSuccess`][Msg]
or you can use [`anyNewOptionSelected`][anyNewOptionSelected] function like above code.

## View

Here is an example

```elm
exampleView : Model -> Html AppMsg
exampleView model
    = let
        theme
            = defaultTheme

        palette
            = theme.palette

        pickerHelper
            = ScrollPicker.viewAsElement model theme

   in
       layout [ Background.color
                (palette.on.surface 
                    -- ^ use same color as shade
                    |> palette.toElmUiColor)
              ] <|
           column [ centerX
                  , centerY
                  ]
               [ row [ spacing 1
                     ]
                     [ pickerHelper model.firstPickerState
                     , pickerHelper model.secondPickerState
                     ]

               , el [ paddingEach
                        { top : 20
                        , right: 0
                        , bottom: 0
                        , left : 0
                        }
                    , Font.size
                        ( ScrollPicker.defaultFontSize
                              |> toFloat
                              |> (*) 0.7
                              |> truncate
                        )
                    , Font.color
                          ( palette.secondary
                                |> palette.toElmUiColor )
                    , centerX
                    ] <|
                   text <| "It's " ++
                       ( model.hourValue
                            |> String.fromInt
                       ) ++ ":" ++
                       ( model.minuteValue
                            |> String.fromInt
                            |> String.padLeft 2 '0'
                       )
           ]
```

## Subscriptions

Animation relies on subscriptions. elm-style-animation also does so.
[`subscriptionsWith`][subscriptionsWith] helps how to subscribe.

```elm
exampleSubscriptions : Model -> Sub AppMsg
exampleSubscriptions model
    = model |>
      ScrollPicker.subscriptionsWith
      [ model.firstPickerState
      , model.secondPickerState
      ]
```

## Main

Finally you can wire thems up in the elm architecture.

```elm
main : Program () Model AppMsg
main
    = Browser.element
      { init = exampleInit
      , view = exampleView
      , update = exampleUpdate
      , subscriptions = exampleSubscriptions
      }
```

# Testing Environment

- Firefox (currently 94.0.1) on Arch linux
- Vivaldi
- [`Gnome Web Epiphany`](https://apps.gnome.org/en-GB/app/org.gnome.Epiphany/)

I'm a chef and not a professional programmer but have been still using Linux
since 2001. My 8 years old laptop can only run Linux smoothly.
And I don't have enough chance to check things on Apple product, either.

so, if you need more techincal support on other platform, please contribute
your solution.


# More Information
**Why elm-style-animation?** [`elm-style-animation`](/packages/mdgriffith/elm-style-animation/latest)
is not quite designed for low level animation. but you could use the module
for any other css-style based animation. So you could possibly add other
animation in your app without any additional module.

[`elm-animation`](/packages/mgold/elm-animation/latest) was also considered,
and *it is* pretty straight-foward.
However the module cannot live together in the same application due to name
colision.
