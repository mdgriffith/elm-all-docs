# elm-triangular-mesh

This [Elm](http://elm-lang.org) package allows you to create and manipulate
indexed triangular meshes. A mesh contains an array of vertices which contain
the bulk of the mesh data; vertices can be of any type, so you can create meshes
from 2D or 3D points or have complex vertices of your own custom type that
include additional data such as colors, normal vectors, texture coordinates,
unique IDs, etc.

Mesh faces are defined by triples of integer indices specifying which three
vertices make up the face. This package has functionality for creating meshes in
various ways, extracting faces as index triples or vertex triples, extracting
edges as index pairs or vertex pairs, and combining multiple meshes.

For example, you might create a 2D mesh representing a single rectangle as:

```elm
import TriangularMesh exposing (TriangularMesh)
import Array

mesh : TriangularMesh ( Float, Float )
mesh =
    let
        vertices =
            Array.fromList
                [ ( 0, 0 )
                , ( 4, 0 )
                , ( 4, 3 )
                , ( 0, 3 )
                ]

        faceIndices =
            [ ( 0, 1, 2 )
            , ( 2, 3, 0 )
            ]
    in
    TriangularMesh.indexed vertices faceIndices
```

You could then do things like get the faces or edges of that mesh as tuples of
vertices:

```elm
TriangularMesh.faceVertices mesh
--> [ ( ( 0, 0 ), ( 4, 0 ), ( 4, 3 ) )
--> , ( ( 4, 3 ), ( 0, 3 ), ( 0, 0 ) )
--> ]

TriangularMesh.edgeVertices mesh
--> [ ( ( 0, 0 ), ( 4, 0 ) )
--> , ( ( 0, 0 ), ( 4, 3 ) )
--> , ( ( 0, 0 ), ( 0, 3 ) )
--> , ( ( 4, 0 ), ( 4, 3 ) )
--> , ( ( 4, 3 ), ( 0, 3 ) )
--> ]
```

## Documentation

[Full API documentation](http://package.elm-lang.org/packages/ianmackenzie/elm-triangular-mesh/1.0.0/TriangularMesh)
is available.

## Questions? Comments?

Please [open a new issue](https://github.com/ianmackenzie/elm-triangular-mesh/issues) if you run
into a bug, if any documentation is missing/incorrect/confusing, or if there's a
new feature that you would find useful. For general questions about using this
package, try:

  - Sending me (@ianmackenzie) a message on the [Elm Slack](http://elmlang.herokuapp.com/) -
    even if you don't have any particular questions right now, just come say
    hello!
  - Posting to [Elm Discourse](https://discourse.elm-lang.org/)
  - Posting to [r/elm](https://reddit.com/r/elm)

You can also find me on Twitter ([@ianemackenzie](https://twitter.com/ianemackenzie)),
where I occasionally post geometry-related stuff like demos or new package
releases. Have fun, and don't be afraid to ask for help!
