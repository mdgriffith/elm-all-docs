# elm-codepage-437

Codepage 437 equivalent unicode codepoints

cp437 provides a 256 character string containing unicode codepoints matching the extended ibm character set.

You can pick them out and use them if you want to display things as they would have been on a pc in text mode.

You can do things like this with it:

    module Main exposing (main)

    import Browser
    import Html exposing (Html, div, pre, text)
    import Codepage.Codepage437 exposing (cp437)

    type alias Model = ()

    initialModel : Model
    initialModel = ()

    type Msg
        = Noop

    update : Msg -> Model -> Model
    update msg model = model

    view : Model -> Html Msg
    view model =
        let
            toDisplay =
                List.range 0xe0 0xef
                |> List.map (\i -> String.slice i (i+1) cp437)
                |> String.concat
        in
        div [] [ pre [] [ text "CGA ", text toDisplay ] ]

    main : Program () Model Msg
    main =
        Browser.sandbox
            { init = initialModel
            , view = view
            , update = update
            }

Displaying:

    CGA αßΓπΣσµτΦΘΩδ∞φε∩
