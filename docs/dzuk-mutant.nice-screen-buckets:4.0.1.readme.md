# Nice Screen Buckets

A detailed, encapsulated way of tracking and storing browser screen size and comparing that with a series of boundaries (called buckets) so you can easily and precisely change functionality and presentation based on screen size.

You can implement this in a couple of different ways with the same data types:


### As normal Elm model data
```
Html.div
    []
    -- show mobile menu if screen width is small enough
    [   ( if Screen.isIn [ handset, portable1 ] model.screen then
            Html.div [] [ Html.text "menu" ]
          else
            []
        )   
    ]
```

### As elm-css Media Queries

```
css [ Screen.withMedia [ handset, portable1, portable2 ]
        [ height (px 32)
        , overflow hidden
        ]

    , Screen.withMedia [ portable3, wide ]
        [ width (px 192)
        , padding4 (px 64) (px 32) (px 32) (px 48)
        ]
    ]
```

In addition to making your own buckets, this package comes with a series of pre-built buckets. Each of the buckets have been thoroughly researched and designed around different categories of displays that keep recurring throughout different classes of devices.

----

## License

This package is licensed [BSD-3-Clause](license.md).

