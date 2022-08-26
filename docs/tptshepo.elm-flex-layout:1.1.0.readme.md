# Elm Flex-Layout

Elm Flex Layout provides a layout API for using Flexbox CSS.

### Getting started

#### Installing the package

```
$ elm install tptshepo/elm-flex-layout
```

### Usage

#### Demo

https://tptshepo.github.io/elm-flex-layout

#### API

##### fxLayout

![image](https://tptshepo.github.io/elm-flex-layout/assets/images/row_spacearound_center.png)

```elm
import Flex
...
...
...
view =
  div ([] ++ fxLayout Flex.row Flex.spaceAround Flex.center)
      [ div [] [text "1"]
      , div [] [text "2"]
      , div [] [text "3"]
      , div [] [text "4"]
      , div [] [text "5"]
      ]
...
...
```

Direction options

```elm
row
column
```

Horizontal and vertical alignment options

```elm
start
center
end
spaceBetween
spaceAround
spaceEvenly
stretch
```
