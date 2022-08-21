# An Elm library for dealing with the Wikimedia Commons API.

See the API and the example for usage instructions.


```elm

module Viewer
    exposing
        ( Model
        , Msg(..)
        , constants
        , init
        , isValidResource
        , main
        , subscriptions
        , update
        , view
        , viewLarge
        )

import Browser
import Html as Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http as Http
import Task
import WikimediaCommons.RandomPictures as RP


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


constants :
    { thumbWidth : Int
    , thumbMaxHeight : Int
    , largeWidth : Int
    , count : Int
    }
constants =
    { thumbWidth = 100
    , thumbMaxHeight = 150
    , largeWidth = 500
    , count = 40
    }



-- MODEL


type alias Model =
    { resources : List RP.PictureResource
    , selection : Maybe RP.PictureResource
    }


init : ( Model, Cmd Msg )
init =
    ( { resources = [], selection = Nothing }
    , getResources
    )


getResources : Cmd Msg
getResources =
    Task.attempt NewResources (RP.fetchResources constants.count)



-- UPDATE


type Msg
    = NewResources (Result Http.Error (List RP.PictureResource))
    | Refresh
    | Select RP.PictureResource
    | Close


isValidResource : RP.PictureResource -> Bool
isValidResource resource =
    let
        ( maxWidth, maxHeight ) =
            RP.getMaxSize resource

        aspect =
            toFloat maxWidth / toFloat maxHeight

        maxAspect =
            toFloat constants.thumbWidth / toFloat constants.thumbMaxHeight
    in
    maxWidth >= constants.largeWidth && aspect > maxAspect


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Refresh ->
            ( model, getResources )

        NewResources (Ok resources) ->
            ( { model | resources = List.filter isValidResource resources }
            , Cmd.none
            )

        NewResources (Err error) ->
            let
                _ =
                    Debug.log "unhandled error" error
            in
            ( model, Cmd.none )

        Select selection ->
            ( { model | selection = Just selection }
            , Cmd.none
            )

        Close ->
            ( { model | selection = Nothing }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


viewLarge : RP.PictureResource -> Html Msg
viewLarge resource =
    let
        styleWrapper =
            [ style "position" "fixed"
            , style "top" "0px"
            , style "right" "0px"
            , style "bottom" "0px"
            , style "left" "0px"
            , style "background-color" "rgbastyle0,0,0,0.5 "
            , style "display" "flex"
            , style "align-items" "center"
            , style "justify-content" "center"
            , style "cursor" "pointer"
            ]
    in
    div ([ onClick Close ] ++ styleWrapper)
        [ img
            [ src (RP.getUrl constants.largeWidth resource |> Maybe.withDefault "")
            ]
            []
        ]


view : Model -> Html Msg
view { resources, selection } =
    let
        styleWrapper =
            [ style "margin" "25px" ]

        styleWrapperList =
            [ style "display" "flex"
            , style "flex-wrap" "wrap"
            ]

        styleItem =
            [ style "border" "1px solid rgbastyle0,0,0, 0.3 "
            , style "width" <| String.fromInt constants.thumbWidth ++ "px"
            , style "height" <| String.fromInt constants.thumbMaxHeight ++ "px"
            , style "margin" "7px"
            , style "display" "flex"
            , style "align-items" "flex-end"
            , style "cursor" "pointer"
            ]

        styleButton =
            [ style "margin-left" "7px"
            , style "margin-bottom" "20px"
            ]
    in
    div styleWrapper
        [ button ([ onClick Refresh ] ++ styleButton) [ text "refresh" ]
        , div
            styleWrapperList
            (List.map
                (\res ->
                    div
                        ([ onClick (Select res)
                         ]
                            ++ styleItem
                        )
                        [ img
                            [ width 100
                            , src (RP.getUrl 100 res |> Maybe.withDefault "")
                            ]
                            []
                        ]
                )
                resources
            )
        , Maybe.map viewLarge selection |> Maybe.withDefault (text "")
        ]


```
