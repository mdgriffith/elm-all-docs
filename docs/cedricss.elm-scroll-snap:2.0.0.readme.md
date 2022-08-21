# Elm Scroll Snap

Scrollable containers with snapping.

```
elm install cedricss/elm-scroll-snap
```

This library is based on elm-css and accepts `Html.Styled.Html` items.
If you are not using elm-css, use `Html.Styled.fromUnstyled` and `Html.Styled.toUnstyled` to convert the items and the resulting container.

## Containers

### Horizontal

Create a container with horizontal scrolling. The most visible item is centered horizontally.

```elm
  div
      [ css
          [ border3 (px 1) solid (hex "eee")
          , width (px 500)
          ]
      ]
      [ ScrollSnap.horizontal
          { itemWidth = px 280 }
          [ item1, item2, item3, item4, item5 ]
      ]
```

![Demo](https://github.com/cedricss/elm-scroll-snap/raw/main/img/horizontal.gif)

### Vertical

Coming next.

## Links

- [package.elm-lang.org/packages/cedricsoulas/elm-scroll-snap/latest](https://package.elm-lang.org/packages/cedricss/elm-scroll-snap/latest)
