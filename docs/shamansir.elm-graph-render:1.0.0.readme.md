# elm-graph-visualize

Visualize Graphs in SVG.

The `elm-community/graph` package is used to represent the graph data.

Supports two ways of rendering: Vertical (top to bottom) and Radial (from the center, spreading leafes around). Items of the graph may have different sizes.

See `Demo/Main.elm` for the complex example with the ability to edit graph structure and node sizes.

# API

To draw a graph to `SVG` use: `Graph.Render.Svg.Graph.graph` :

In `Graph.Geometry.Make` you'll find options to switch from Vertical to Radial representation.

`renderNode` is the function that takes position, and `NodeContext` of graph, so if needed you would be able to draw edges as well using `incoming`/`outgoing` lists and `NodesPositions` provided as the second argument.


```elm
import Graph.Render.Svg.Graph as Render
import Graph.Geometry.Make as Geom


myGraph : Graph n e
myGraph = ...


view =
    Render.graph
        Geom.defaultWay
        renderNode
        (always size)
        model

renderNode : Geom.Position -> Render.NodesPositions -> G.NodeContext n e -> Html msg
renderNode {x, y} _ { label, incoming, outgoing } =
    ...
```

# Full example

As another example, here is how to render a simple graph taken from `README` of the package (it doesn't have leaves with many children, but you can easily change it using `Tree.leaf` and `Tree.inner` helpers).

```elm
import IntDict as ID exposing (IntDict)

import Html exposing (Html)
import Svg as S exposing (Svg)
import Svg.Attributes as SA

import Graph as G exposing (Graph)
import Graph.Geometry as Geom
import Graph.Geometry.Make as Geom
import Graph.Render.Svg.Graph as Render


type alias Model = Graph String ()


init : Model
init = dressUp


dressUp : Model -- node labels are strings, edge labels are empty
dressUp =
  let
    nodes =
      [ G.Node 0 "Socks"
      , G.Node 1 "Undershirt"
      , G.Node 2 "Pants"
      , G.Node 3 "Shoes"
      , G.Node 4 "Watch"
      , G.Node 5 "Shirt"
      , G.Node 6 "Belt"
      , G.Node 7 "Tie"
      , G.Node 8 "Jacket"
      ]

    e from to =
      G.Edge from to ()

    edges =
      [ e 0 3 -- socks before shoes
      , e 1 2 -- undershorts before pants
      , e 1 3 -- undershorts before shoes
      , e 2 3 -- pants before shoes
      , e 2 6 -- pants before belt
      , e 5 6 -- shirt before belt
      , e 5 7 -- shirt before tie
      , e 6 8 -- belt before jacket
      , e 7 8 -- tie before jacket
      ]
  in
    G.fromNodesAndEdges nodes edges


size = { width = 60, height = 60 }


view : Model -> Html msg
view model =
    Render.graph
        Geom.defaultWay
        renderNode
        (always size)
        model



main =
    Browser.sandbox
        { init = init
        , update = always identity
        , view = view
        }


renderNode : Geom.Position -> Render.NodesPositions -> G.NodeContext String () -> Svg msg
renderNode pos nodesPositions { node, outgoing } =
    S.g
        []
        <| S.g
            [ SA.transform <| "translate(" ++ String.fromFloat pos.x ++ "," ++ String.fromFloat pos.y ++ ")"
            ]
            [
                S.rect
                    [ SA.width <| String.fromFloat size.width
                    , SA.height <| String.fromFloat size.height
                    ]
                    []
            ,
                S.text_
                    [ SA.transform <| "translate(" ++ String.fromFloat (size.width / 2) ++ "," ++ String.fromFloat (size.height / 2) ++ ")"
                    ]
                    [ S.text node.label
                    ]
            ]
        :: renderEdges pos nodesPositions outgoing
        :: []


renderEdges : Geom.Position -> Render.NodesPositions -> G.Adjacency () -> Svg msg
renderEdges from nodesPositions =
    S.g [] << List.map Tuple.second << ID.toList << ID.map
        (\otherNodeId _ ->
            case ID.get otherNodeId nodesPositions of
                Just otherNodePos ->
                    let
                        otherNodeSize = size
                    in S.line
                        [ SA.x1 <| String.fromFloat (from.x + size.width / 2)
                        , SA.y1 <| String.fromFloat (from.y + size.height / 2)
                        , SA.x2 <| String.fromFloat (otherNodePos.x + otherNodeSize.width / 2)
                        , SA.y2 <| String.fromFloat (otherNodePos.y + otherNodeSize.height / 2)
                        ]
                        []
                Nothing ->
                    S.g [] []
        )
```