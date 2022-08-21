# HtmlData

Yet another pure data representation of [elm/html](https://package.elm-lang.org/packages/elm/html/latest). (Perhaps some types need not be opaque after all)

**Before**

```elm
import Html exposing (..)

pagetitle : Int-> Html msg
pagetitle num =
    if modBy 2 num == 0 then
        h2 [] [ text "Get even" ]

    else
        h1 [] [ text "That's odd" ]
```

But the return value is opaque; we cannot inspect it nor do anything with it other than return it to elm runtime for rendering on a browser.

**After**

```elm
import HtmlData exposing (..)

pagetitle : Int-> Html msg
pagetitle num =
    if modBy 2 num == 0 then
        h2 [] [ text "Get even" ]

    else
        h1 [] [ text "That's odd" ]
```

Changing only the `import`, we can pattern match and inspect the return value.

```elm
case pagetitle 4 of
    Element "h1" _ _ ->
        "Odd? Wrong"

    Element "h2" _ _ ->
        "Even! Correct"

    _ ->
        "Not even close"
```

We can write functions that convert it into html String

```elm
pagetitle 4
    |> HtmlData.Extra.toTextHtml HtmlData.Extra.defaultSanitizeConfig renderedNode
--> "<h2>Get&#32;even</h2>"
```

Or plain text String

```elm
pagetitle 4
    |> HtmlData.Extra.toTextPlain HtmlData.Extra.defaultTextPlainConfig
--> "Get even"
```

## Useful Functions

But note that there's only type definitions in _this_ package; the dependencies of this package is minimum.

Actual helper functions like `toTextPlain` can be found in [`HtmlData.Extra`](https://package.elm-lang.org/packages/choonkeat/html-data-extra/latest/) instead.

## Demo

See [https://html-data.netlify.app](https://html-data.netlify.app) for a demo of how we can use these data types. Its source code can be found in [github.com/choonkeat/explore-html-data-extra](https://github.com/choonkeat/explore-html-data-extra/blob/main/src/Main.elm)

## Out of scope

- Parsing html https://package.elm-lang.org/packages/hecrj/html-parser/latest/
- Turn an Elm app into a static HTML site https://github.com/eeue56/elm-static-html https://github.com/ThinkAlexandria/elm-static-html
