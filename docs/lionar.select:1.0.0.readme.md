# Material design selectbox

A simple material design selectbox


## Installation

elm install lionar/select


## Styles

The styles are provided separate: [styles](https://github.com/lionar/select/tree/master/resources)


## Example


``` elm
module Main exposing (..)

import Browser
import Html exposing (..)
import Mdc.Select as Select


type Code
    = EXW
    | FCA
    | FAS
    | FOB
    | CFR
    | CIF
    | CPT
    | CIP
    | DAF
    | DES
    | DEQ
    | DDU
    | DDP


list : List Code
list =
    [ EXW
    , FCA
    , FAS
    , FOB
    , CFR
    , CIF
    , CPT
    , CIP
    , DAF
    , DES
    , DEQ
    , DDU
    , DDP
    ]


toString : Code -> String
toString inco =
    case inco of
        EXW -> "EXW"   
        FCA -> "FCA"       
        FAS -> "FAS"        
        FOB -> "FOB"      
        CFR -> "CFR"        
        CIF -> "CIF"        
        CPT -> "CPT"        
        CIP -> "CIP"        
        DAF -> "DAF"        
        DES -> "DES"        
        DEQ -> "DEQ"
        DDU -> "DDU"
        DDP -> "DDP"


main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


type alias Model =
    { inco : Code
    , selecting : Bool
    }


init : Model
init =
    { inco = FCA
    , selecting = False
    }


type Msg
    = OnClose
    | OnSelect Code
    | OnToggle


update : Msg -> Model -> Model
update msg model =
    case msg of
        OnClose ->
            { model | selecting = False }
        OnSelect inco ->
            { model | inco = inco, selecting = False }
        OnToggle ->
            { model | selecting = not model.selecting }


view : Model -> Html Msg
view { inco, selecting } =
    Select.view
        { items = list
        , opened = selecting
        , selected = inco
        }
        { close = OnClose
        , select = OnSelect
        , toggle = OnToggle
        }
        toString
```
