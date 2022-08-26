# rosetree-path

A path is the location of a branch in a tree.
With this package you can use paths to navigate and modify [zwilias/elm-rosetree](https://package.elm-lang.org/packages/zwilias/elm-rosetree/latest/).

A [`Tree.Zipper`](https://package.elm-lang.org/packages/zwilias/elm-rosetree/latest/Tree-Zipper) can also show a specific node in the tree but if you want to
- keep track of many locations
- easily deal with things like one _potentially_ focussed node

→ paths can be a nice alternative.

Example: There's a big tree on the screen. You want to be able to move and delete a subtree.

See in [examples](https://github.com/lue-bird/rosetree-path/tree/master/examples/).

```elm
import TreePath exposing (TreePath)
import Tree.Extra.Lue as Tree


type alias Model =
    { tree : Tree { translate : ( Float, Float ) }
    , dragged : Maybe TreePath
    }

viewTree path tree =
    (...
        |> onMouseDown (PressedOn path)
        |> onRightClick (RightClickedOn path)
    )
        :: (Tree.children tree
                |> List.indexedMap
                    (\index ->
                        viewTree
                            (path |> TreePath.toChild index)
                    )
           )
        |> group
        |> shift (Tree.label tree).translate

type Msg =
    = RightClickedOn TreePath
    | MouseMoved ( Float, Float )
  --| ...

update msg model =
    case msg of
        RightClickedOn path ->
            { model
              | trees =
                  model.tree
                      |> Tree.mapChildren
                          (Tree.removeAt path)
            }
        
        MouseMoved mousePosition ->
            case model.dragged of
                Just path ->
                    { model
                      | tree =
                          Tree.updateAt path
                              (Tree.mapLabel
                                  (\l -> { l | translate = ... })
                              )
                    }

                Nothing ->
                    model
        
      --...
```
