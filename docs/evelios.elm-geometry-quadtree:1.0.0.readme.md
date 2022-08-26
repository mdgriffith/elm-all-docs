# elm-geometry-quadtree

Quadtree implementation in Elm. This is useful for things like 2D collision detection and rendering. Quadtrees can provide quick lookup for rectangle collisions and nearest neighbor searches which can be used to improve the performance of many graphics algorithms significantly.

This data structure is built on top of the [elm-geometry](https://package.elm-lang.org/packages/ianmackenzie/elm-geometry/latest/) library and provides an easy interface with data structures which use this library.


## Example

```elm
import QuadTree
import BoundingBox2d
import Point2d

points =     
    [ Point2d.meters 1 2
    , Point2d.meters 4 2
    , Point2d.meters -1 8
    , Point2d.meters 3 2
    , Point2d.meters -2 -9
    ]

boundingBox =
    BoundingBox2d.from
        (Point2d.meters -2, -9)
        (Point2d.meters 4, 8)


quadtree =    
    points |> List.map
        (\point ->
            { position = point
            , boundingBox = BoundingBox2d.singleton point
            }
        )
    |> Quadtree.init boundingBox 2
```