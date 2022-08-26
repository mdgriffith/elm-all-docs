# elm-html-pipeline

Build HTML nodes using the pipeline [`(|>)`](http://package.elm-lang.org/packages/elm-lang/core/3.0.0/Basics#|>)
operator.

## Example

```elm
import Html
import Html.Attributes
import Html.Pipeline

associatedLabelAndInput :
    { id : String }
    ->
        ( Html.Pipeline.Element msg
        , Html.Pipeline.Element msg
        )
associatedLabelAndInput { id } =
    ( Html.Pipeline.node "label"
        |> Html.Pipeline.addAttributes
            [ Html.Attributes.for id
            ]
    , Html.Pipeline.node "input"
        |> Html.Pipeline.addAttributes
            [ Html.Attributes.id id
            ]
    )

inputWithLabel { id, value, type_, onChange } =
    let
        ( label, input ) =
            associatedLabelAndInput { id = id }
    in
    Html.div []
        [ label
            |> Html.Pipeline.addChildren
                [ Html.text "Password"
                ]
            |> Html.Pipeline.toHtml
        , input
            |> Html.Pipeline.addAttributes
                [ Html.Attributes.type_ type_
                , Html.Attributes.value value
                , Html.Events.onInput onChange
                ]
            |> Html.Pipeline.toHtml
        ]
```

## Motivation

This package doesn't solve any problem that you can't solve with [elm/html](https://package.elm-lang.org/packages/elm/html/latest/),
but it provides an alternative API.

If you find yourself doing a lot of `::`, `++` or `List.concat` in a view, using this package might make the
code easier to read and mantain.

This package is not a replacement for [elm/html](https://package.elm-lang.org/packages/elm/html/latest/),
though.
