# elm-engage-common

Engage's common UI framework components

**Not for community use**

Css is compiled to `src/elm-engage-common.css` and must be included manually. 


## Example using Buttons

``` elm
view : Model -> Html Msg
view model =
    div []
        [ p []
            [ Button.primary { namespace = Namespace.engagecore, attributes = [], text = "Primary Button" }
            , Button.standard { namespace = Namespace.engagecore, attributes = [], text = "Default Button" }
            , Button.divert { namespace = Namespace.engagecore, attributes = [], text = "Divert Button" }
            ]
        , p []
            [ Button.primarySmall { namespace = Namespace.engagecore, attributes = [], text = "Small Primary Button" }
            , Button.standardSmall { namespace = Namespace.engagecore, attributes = [], text = "Small Default Button" }
            , Button.divertSmall { namespace = Namespace.engagecore, attributes = [], text = "Large Divert Button" }
            ]
        ]
```