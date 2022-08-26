# Responsive Pixels

```
Html.label
    [ class "label"
    , for id
    , css   [ displayFlex
            , boxSizing borderBox
            , minHeight (blc 3) -- 1.5 rems, or 24px at 'normal' font size.
            , paddingTop (rpx 1) -- 0.0625 rems, or 1px at 'normal' font size.
            , fontSize (rpx 14) - 0.875 rems or 14px at 'normal' font size.
            ]
    ]
    []
```

Rems are a really important measurement when creating web
interfaces that are accessible. This is because rem-based
measurements are scalable according to the user's font size
preferences, while pixels are not.

The problem with rems however, is that the scale they operate
on is not accessible for designers, often requiring a lot of
mental calculation to translate it from pixels, which is a
much more natural measurement to work with.

Responsive pixels are a quick and easy drop-in replacement for
rems that let you think in pixels, while deploying to rems.

This package adds two new measurement functions for use in elm-css.

- `rpx` - **Responsive Pixel**, which is equivalent to 1px on a display at standard zoom/text size. (1/16 rems)
- `blc` - **Block**, equivalent to 8rpx. Useful when creating layouts in multiples of 8. (1/2 rems)

Both of these functions produce `Css.Rem` values, so they are drop-in replacements for any elm-css property that can accept `Rem` measurements.

This package also includes a few convenience functions for performing math on Rem values when you have consistent metrics across a large interface project.

---

## License

This package is licensed [BSD-3-Clause](license.md).

[The original idea for responsive pixels came from Aral Balkan.](https://ar.al/notes/responsive-pixels/)
