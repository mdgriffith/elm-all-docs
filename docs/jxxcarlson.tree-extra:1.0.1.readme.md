# Tree.Extra

**Tree.Extra** provides functions for working with rose trees as defined
in [zwilias/elm-rosetree](attach gte targetNode subTree tree), e.g, 
`removeSubTree`, `moveSubTree`, and `spanningTree`.  Here is an example:

````elm

    > import Tree  -- from zwilias/elm-rosetree
    > import Tree.Extra exposing(..)
    
    > s = Tree.singleton
    > t = Tree.tree 

    > a = t 1 [ t 2 [ s 3, t 4 [s 5, s 6]]]
    Tree 1 [Tree 2 [Tree 3 [],Tree 4 [Tree 5 [],Tree 6 []]]]

   > moveSubTree 4 1 a
    Just (Tree 1 [ Tree 2 [Tree 3 []]  
                 , Tree 4 [Tree 5 [],Tree 6 []]])
````

In certain
cases, one assumes given a function that defines a partial order on nodes,
or better said, labels of nodes:

    bigger : a -> a -> Bool

For `Tree Int`, one can use

    bigger = (>)
 
See the function `attach` for an example of this.        