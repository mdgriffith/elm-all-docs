# elm-thumbor 

[![Build Status](https://travis-ci.com/itravel-de/elm-thumbor.svg?branch=master)](https://travis-ci.com/itravel-de/elm-thumbor)

Generate [Thumbor](https://github.com/thumbor/thumbor) URLs with Elm.

This package implements all documented Thumbor options and filters for easy use within your Elm applications.
It implements the, as of writing, current Tumbor version of `6.7.0`.

This package takes some liberties in API design to make it type-safe, but tries to stay close to the original Thumbor 
API naming and usage to make mapping between the official documentation as easy as possible.

## Example

```elm
view : Model -> Html msg
view model =
    model.teaserImages
        |> List.map (\imageUrl -> img [ src (scaleTeaserImage imageUrl) ] [])
        |> div []


scaleTeaserImage : String -> String
scaleTeaserImage =
    thumbor
        [ Thumbor.sizeFixed 500 500
        , Thumbor.fitIn Thumbor.NormalFitIn
        , Thumbor.filters
            [ Thumbor.Filter.noUpscale
            , Thumbor.Filter.format Thumbor.Filter.Jpeg
            , Thumbor.Filter.quality 80
            , Thumbor.Filter.watermark
                { imageUrl = "https://example.com/images/watermark.png"
                , horizontalPosition = Thumbor.Filter.LeftPixels 10
                , verticalPosition = Thumbor.Filter.BottomPixels 10
                , alphaPercentage = 50
                , widthRatio = Nothing
                , heightRatio = Nothing
                }
            ]
        ]


thumbor : List Thumbor.Attribute -> String -> String
thumbor =
    Thumbor.url { baseUrl = "https://example.com", key = Just "secret" }
```

## Security Considerations

Since Elm applications mostly run in client's browsers directly, the key for URL signing is available in clear-text.
This nullifies the whole purpose of URL signing to make tampering impossible. This might be okay for your use-case
but you usually have to think about a better way to protect yourself from malicious Thumbor requests when you use this
package.

For details about Thumbors URL signing, see: https://thumbor.readthedocs.io/en/latest/security.html
