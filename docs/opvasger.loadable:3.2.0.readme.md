# Elm Loadable

Intuitive data-loading in Elm!

This project is an extension of the ideas from a very cool
[project](https://package.elm-lang.org/packages/krisajenkins/remotedata/latest)/[blog](http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html)/[talk](https://www.youtube.com/watch?v=NLcRzOyrH08)!

User-interfaces (I like) usually view initial-loads and reloads differently.
Stale information can be viewed in cases where you are reloading a value or
failed to.

This is the type at the core of the module:

```elm
type Loadable error value
    = Idle
    | Loading
    | Success value
    | Failure error
    | Reloading value
    | ReloadFailure error value
```

This complete Elm-program shows how loading (and displaying) a github-repository
could be done:

```elm
module Main exposing (main)

import Browser
import Element exposing (el)
import Element.Font
import Element.Input
import Http
import Json.Decode
import Loadable


type alias Model =
    { repository : Loadable.FromHttp Repository }


type Msg
    = GetRepository
    | GotRepository (Result Http.Error Repository)


init _ =
    ( { repository = Loadable.Idle }
    , Cmd.none
    )


update msg model =
    case msg of
        GetRepository ->
            ( { model | repository = Loadable.expectUpdate model.repository }
            , getRepository
            )

        GotRepository result ->
            ( { model | repository = Loadable.update result model.repository }
            , Cmd.none
            )


view model =
    Element.layout [] <|
        el [ Element.centerX, Element.centerY, Element.spacing 10 ]
            (viewLoadable "repository" viewRepository model.repository)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }


type alias Repository =
    { name : String
    , description : String
    , language : String
    }


viewRepository repo =
    Element.column [ Element.paddingXY 0 10 ]
        [ el [ Element.Font.bold ] (Element.text repo.name)
        , el [ Element.Font.italic ] (Element.text repo.description)
        , Element.text ("written in " ++ repo.language)
        ]


getRepository =
    Http.get
        { url = "https://api.github.com/repos/opvasger/loadable"
        , expect = Http.expectJson GotRepository repositoryDecoder
        }


repositoryDecoder =
    Json.Decode.map3 Repository
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "description" Json.Decode.string)
        (Json.Decode.field "language" Json.Decode.string)


viewGetRepositoryButton text =
    Element.Input.button [ Element.Font.underline ]
        { onPress = Just GetRepository
        , label = Element.text text
        }


viewLoadable name viewValue loadable =
    case loadable of
        Loadable.Idle ->
            viewGetRepositoryButton ("get the " ++ name)

        Loadable.Loading ->
            Element.text "loading"

        Loadable.Success value ->
            Element.column []
                [ viewValue value
                , viewGetRepositoryButton "reload"
                ]

        Loadable.Failure _ ->
            Element.column []
                [ Element.text ("failed to get the " ++ name)
                , viewGetRepositoryButton "retry"
                ]

        Loadable.Reloading value ->
            Element.column []
                [ viewValue value
                , Element.text "reloading..."
                ]

        Loadable.ReloadFailure _ value ->
            Element.column []
                [ Element.text ("failed to reload the " ++ name)
                , viewValue value
                , viewGetRepositoryButton "retry"
                ]
```
