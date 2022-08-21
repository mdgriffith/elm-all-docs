# elm-tree-path

This package implements a strongly typed hierarchical rose tree and associated zipper.

## A traditional rosetree implementation

A rose tree in a functional language would normally be defined using a recursive type such as:

```elm
type RoseTree a = RoseTree a (List (RoseTree a))
```

For example, there is an Elm implementation available at https://package.elm-lang.org/packages/zwilias/elm-rosetree.

This is all well and good for trees where nodes are always of type `a`, and where the tree can be of infinite depth.  However, in some situations trees are of a fixed depth, and each level of the tree has a distinct type.

A good example of this is a menu system.  Let's imagine the menu of an e-learning app organised into `Course`s, `Unit`s and `Exercise`s.

```
Menu                    O
                      / | \
Course               O  O  O
                   / |   / | \
Unit              O  O  O  O  O
                / |  |  |  |  | \
Exercise       O  O  O  O  O  O  O
```

Although this could be represented using the above type, there is no way to encode the fact that only certain types are allowed at different levels of the tree.  The best we could do would be:

```elm
type Content
  = Menu MenuData
  | Course CourseData
  | Unit UnitData
  | Exercise ExerciseData

type ContentRoseTree =
  Tree Content
```

This means at each level of the tree we would have to deal with `Maybe`s that don't need to be there.  This package is an attempt to use knowledge of the tree structure to avoid this.
