# Elm Dropzone

** Elm 0.19 fork of [danyx23/elm-dropzone](https://github.com/danyx23/elm-dropzone) **

Provides helpers to make it easy to add a "dropzone" into an elm webapp.

### Store the DropZone.Model as part of your model

```elm
type alias Model =
    { dropZone : DropZone.Model -- this is the dropzone model you need to store
    , ... -- other parts of your model
    }

init : Model
init =
    { dropZone = DropZone.init
    , ... -- init other parts
    }
```

### Update the DropZone.Model as part of your update function
```elm
type Msg
    = DropZoneMsg (DropZone.DropZoneMessage (List FileReader.NativeFile))
    | .. -- other actions

update : Msg -> Model -> (Model, Cmd Msg)
update message model =
    case message of
        -- Drop is the only message that you will want to handle yourself as well
        DropZoneMessage (Drop files) ->
            ( { model -- Make sure to update the DropZone model
              | dropZone = DropZone.update (Drop files) model.dropZone
              , .. -- maybe store the files in your own model
              , files = files
              }
            , Cmd.none
            )
        DropZoneMessage a ->
            -- These are the other DropZone actions that are not exposed,
            -- but you still need to hand it to DropZone.update so
            -- the DropZone model stays consistent
            ( { model | dropZone = DropZone.update a model.dropZone }
            , Cmd.none
            )
        .. -- other action handling here
```
### Render the view for your dropzone

Here the important thing is that you are in full control of rendering your dropzone. All you need
to do to make sure it works as a DropZone is add the attributes you get from a call to
dropZoneEventHandlers. If you like you can use the isHovering method to render your dropzone
differently when the user is hovering over it with a DnD operation.

dropZoneEventHandlers takes a Json.decoder to extract the "payload" from the native JS drop event.
We use the FileReader.parseDroppedFiles here to extract a List of native JS File objects.

```elm
-- Write a function that renders your dropzone and use dropzoneEventHandlers to
-- turn it into a dropzone.
dropZoneView : Model -> Html msg
dropZoneView model =
    div
      ( (hoveringDependentStyles model.dropZoneModel)
      :: dropZoneEventHandlers jsonFileDecoder)
      []

hoveringDependentStyles : DropZone.Model -> Html.Attribute msg
hoveringDependentStyles dropZoneModel =
  if (DropZone.isHovering dropZoneModel) then
    style [( "border", "3px dashed red")]
  else
    style [( "border", "3px dashed steelblue")]
```

Where `jsonFileDecoder` can translate the FileList json object. The Elm Json Decode Library ["oneOrMore"](https://package.elm-lang.org/packages/elm/json/latest/Json-Decode#oneOrMore) function has an example on how you could write a decoder for the FileList returned from drop event. Or see the example/....


by Daniel Bachler, Simon Hampton
