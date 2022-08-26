
## HTOC-Editor

This project demonstrates a drag-and-drop editor for
a hierarchircal table of contents (HTOC).  

[Ellie](https://ellie-app.com/bGzPy3BBWkCa1)


In the 
demo app, items can
be dragged vertically. Additinally, the buttons ◀ and ▶ 
permit the user to change the indentation level.
Numbering is automatic. For example, one might
have an HTOC that looks like this:


```
1 Mount Yadaax-Vor
2 The Kraken Roars
3 The Magic Stone
4 A Quiet Pool
5 Lost on the River
6 Crossing the Desert
7 A Strange Beast
```

The user can rearrange it to make 
it look like this.

```
1 A Quiet Pool
2 Mount Yadaax-Vor
  2.1 The Magic Stone
  2.2 A Strange Beast
      2.2.1 The Kraken Roars
3 Lost on the River
4 Crossing the Desert
```

Each item in an HTOC has a *level*, which you can
think of as corresponding to the extent to which an 
item is indented if the list is viewed as an outline.  A list is *well-formed* if the level of an item
is not more than 1 plus the level of the previous item. 

It can happen that the user drags items into an ill-formed
state.  The `HTOC.update` function 
transforms such a list into one which is well-formed.  See the source code
for details.

The demo app (`./demo/Main.elm`) uses the drag-and-drop library
[annaghi/dnd-list](https://package.elm-lang.org/packages/annaghi/dnd-list/latest/)
and the module `HTOC` in this repo.  The latter makes use of rose trees
to number items of the list.

