# Structured Text

[DatoCMS](https://www.datocms.com/) is a headless CMS that uses a custom format based on a [unist tree](https://github.com/syntax-tree/unist) for its rich-text fields. This type of field is called `Structure Text` and the format specification is known as `DatoCMS Abstract Syntax Tree` or `DAST`

This package provides a way to decode a DAST document from JSON and render it as `elm/html` nodes.

The DAST specification can be found [here](https://www.datocms.com/docs/structured-text/dast).

## Example

This is a complex example to show advanced use case with several items type embedded in your document. Simpler examples are available inside the documentation of the modules.

```elm
-- We define a type containing all the items we can 
-- have inside the DAST document
type Item = 
    Author AuthorItem 
    | Image ImageItem

type alias AuthorItem =
    { name : String
    , company : String
    }
    
type alias ImageItem =
    { url : String
    , alt : String
    }
        
        
-- Then a decoder for those items
itemDecoder : Decoder  (List (ItemId, Item))
itemDecoder =
    Decode.field "_modelApiKey" Decode.string
        |> Decode.andThen (\model -> 
            case model of
                "image" -> 
                    Decode.map2 Image itemIdDecoder imageItemDecoder
                    
                "author" -> 
                    Decode.map2 Author itemIdDecoder authorItemDecoder
                    
                _ ->
                    Decode.fail "Unexpected item type"
        )
        |> Decode.map2 Tuple.pair itemIdDecoder
    
itemIdDecoder : Decoder ItemId
itemIdDecoder =
    Decode.field "id" Decode.string 
        |> Decode.map StructuredText.itemId

imageItemDecoder : Decoder ImageItem
imageItemDecoder =
    Decode.map2 ImageItem
        (Decode.field "url" Json.Decode.string)
        (Decode.field "alt" Json.Decode.String)

authorItemDecoder : Decoder AuthorItem
authorItemDecoder =
    Decode.map2 ImageItem
        (Decode.field "url" Json.Decode.string)
        (Decode.field "alt" Json.Decode.String)



-- Decode "blocks" and "links" fields from a Structured Text 
-- field in DatoCMS along with the DAST document itself in 
-- "value".
myFieldDecoder : Decoder (StructuredText ImageItem)
myFieldDecoder =
    Decode.map2 List.concat 
        (Decode.field "blocks" (Decode.list itemDecoder))
        (Decode.field "links" (Decode.list itemDecoder))
        |> Decode.andThen
            (\items ->
                Decode.field "value" (StructuredText.Decode.decoder items)
            )
            

-- Those "renderParameters" are used to render blocks and 
-- item links.
renderParameters : RenderParameters Item msg
renderParameters =
    { emptyRenderParameters
        | renderBlocks = (\item ->
            case item of
                Image image -> 
                    renderImage image
                    
                Author author -> 
                    renderAuthor author
        )  
        
        , renderItemLink =
            \itemLinkData children ->
                case itemLinkData.item of
                    Image image -> 
                        renderImageLink image children
                        
                    Author author -> 
                        renderAuthorLink author children
    }
            
            
-- In the main, we're trying to decode the JSON DAST document 
-- and render it in HTML
main =
    Decode.decodeString myFieldDecoder myJsonDastDocument
        |> Result.map (StructuredText.Decode.render renderParameters)
        |> Result.withDefault (text "Invalid document")
```

## Use with [dillonkearns/elm-graphql](https://github.com/dillonkearns/elm-graphql)

You're probably using this with the GraphQL package. To decode the structured text fields, you'll need to [setup custom scalar codecs](https://incrementalelm.com/scalar-codecs-tutorial/).

You can find an example on my [personal website available on Github](https://github.com/jgrenat/personal-website).


## Videos

I've decided to record the different steps of this package creation into videos that you can find [on my YouTube channel](https://www.youtube.com/watch?v=4FtZze7P134&list=PLPFFi6hw8lDFzCnA64BpIzLC6qjyARNXh).

The goal was both to learn how to properly build an Elm package and provide resources for those who would like to learn the same.

[![Click to watch the recording of this package creation on YouTube](https://i.ytimg.com/vi/4FtZze7P134/hqdefault.jpg)](https://www.youtube.com/watch?v=4FtZze7P134&list=PLPFFi6hw8lDFzCnA64BpIzLC6qjyARNXh)

## Contributions

Contributions are welcome, but please open an issue first to frame the feature you're trying to add and get feedback before wasting any of your precious time into a wrong direction 😄

## License

The license is [BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause).
