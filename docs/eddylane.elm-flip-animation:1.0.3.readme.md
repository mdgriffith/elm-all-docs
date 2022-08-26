# FLIP animations with Elm

- [Example application](https://eddylane.github.io/elm-flip-animation)
- [Example application source](https://github.com/EddyLane/elm-flip-animation/tree/master/examples)

## Introduction

Usually [FLIP animations](https://medium.com/developers-writing/animating-the-unanimatable-1346a5aab3cd) are achieved in 
react by hooking into lifecycle methods. Unfortunately this is not possible in elm. 

Instead this library renders two versions of the visible content, the source of truth invisible version of the state
(with `visibility:hidden` set) and the animated version which is `position:absolute` on top of the invisible space left.

Although I would have loved to make this a pure elm library I could not find a way of achieving this effect without using 
a port to get the position of th elements to be animated. Sorry, PRs are welcome! :)

## Setup

__Create ports__.

```elm
import Json.Decode as Decode
import Json.Encode as Encode

port getBoundingClientRects : Encode.Value -> Cmd msg
port gotBoundingClientRects : (Decode.Value -> msg) -> Sub msg

```

```javascript
...
app.ports.getBoundingClientRects.subscribe((ids) => {
    requestAnimationFrame(() => app.ports.gotBoundingClientRects.send(
        ids.reduce((acc, id) => {
            const el = document.querySelector(`[data-elm-flip-id="${id}"]`);
            if (el) {
                acc.push({
                    id, rectangle: {
                        left: el.offsetLeft,
                        top: el.offsetTop,
                        height: el.offsetHeight,
                        width: el.offsetWidth
                    }
                });
            }
            return acc;
        }, [])
    ));
});
```

__Configure model__.
```elm
type alias Model =
    { flip : Flip.State
    , children : List FlipItem
    }
```

__Configure flip__.
```elm
type Msg
    = UpdateFlip Flip.State (Cmd Msg)
    | AnimateFlip String Animation.Msg

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateFlip flip flipCmd ->
            ( { model | flip = flip }
            , flipCmd
            )

        AnimateFlip id subMsg ->
            ( { model | flip = Flip.animate subMsg id model.flip }
            , Cmd.none
            )
```

__Init flip__.
```elm

type alias FlipItem =
    { id : String
    , label : String
    , icon : String
    }
    
flipConfig : Flip.Configuration FlipItem Msg
flipConfig =
    { id = .id
    , updateMsg = UpdateFlip
    , animateMsg = AnimateFlip
    , getBoundingClientRects = getBoundingClientRects
    , gotBoundingClientRects = gotBoundingClientRects
    , spring =
        { stiffness = 210
        , damping = 20
        }
    }

init : ( Model, Cmd Msg )
init =
    let
        flipItems =
            [ { id = "1", label = "Get rid of all of the spiders", icon = "fa-spider" }
            , { id = "2", label = "Learn to write Haskell", icon = "fa-language" }
            , { id = "3", label = "Water the plants", icon = "fa-seedling" }
            , { id = "4", label = "Eat a cookie ", icon = "fa-cookie" }
            , { id = "5", label = "I can't see anything", icon = "fa-low-vision" }
            , { id = "6", label = "I love to eat Nandos", icon = "fa-grin-hearts" }
            , { id = "7", label = "Front page of the internet", icon = "fa-globe" }
            ]

        ( flip, flipCmd ) =
            Flip.init flipConfig flipItems
    in
    ( { flip = flip
      , children = flipItems
      }
    , flipCmd
    
```

__Subscriptions__.

```elm
subscriptions : Model -> Sub Msg
subscriptions model =
    Flip.subscriptions flipConfig model.flip model.children

```

__View__.
```elm
Flip.render
    { config = flipConfig
    , children = model.children
    , state = model.flip
    , childElement = always div
    , childAttrs = always []
    , childContents = (\child -> [ text child.label ])
    }
```

## Examples

For for some reason currently with 0.19.0 version of elm there is an error whilst using this library when not using the 
--optimize flag. Sorry about that. Hopefully this will be fixed soon in elm core.