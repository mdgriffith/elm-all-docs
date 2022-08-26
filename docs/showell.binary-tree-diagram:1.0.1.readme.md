This
[package](https://package.elm-lang.org/packages/showell/binary-tree-diagram/latest/)
draws binary trees.

Here is a [demo](https://showell.github.io/binary-tree-diagram.html).  If for some
reason the demo is not up, you can always build it from the
[repo](https://github.com/showell/binary-tree-diagram/blob/master/src/Main.elm).

This package **only draws binary trees**.  You may want to try
[elm-tree-diagram](https://package.elm-lang.org/packages/alex-tan/elm-tree-diagram/latest/)
for similar code that works with arbitrary trees.

The trees are drawn with SVG in a viewbox, so you can scale them as needed.

Trees are always shown symmetrically, even if the tree is somewhat unbalanced.  (I
consider this a feature, even for unbalanced trees, but you may differ.)

If you have a deep tree, the leaves will be teeny tiny.  A nice way to enhance
this package would be to have some kind of zoom capability.

The code here is pretty tiny--only a few hundred lines.  Feel free to fork
it or subsume it as needed to make it work better for your particular needs.

Thanks!


-- [Steve Howell](https://showell.github.io/)

