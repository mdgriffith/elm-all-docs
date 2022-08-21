# HtmlData.Extra

Helper functions to work with [HtmlData](https://package.elm-lang.org/packages/choonkeat/html-data/latest/)

- `toTextHtml` produces a html `String`
- `toTextPlain` produces text `String` with reasonable layout to mimic html ([sample](https://package.elm-lang.org/packages/choonkeat/html-data-extra/latest/HtmlData-Extra#toTextPlain))
- `toElmHtml` produces the regular elm/html `Html msg` with interactivity intact
- `fromHtmlParserNodes` takes parsed [`List Html.Parser.Node`](https://package.elm-lang.org/packages/hecrj/html-parser/latest/Html-Parser#run) and return a `List (HtmlData.Html msg)`

See them in action at https://html-data.netlify.app converting the same `HtmlData.Html msg` value into the 3 usages.

## License

BSD

## Why is this a separate package from choonkeat/html-data

This package needed several dependencies: `elm/json`, `hecrj/html-parser`, `marcosh/elm-html-to-unicode`. I felt it was unnecessary to impose it on the pure data type package [choonkeat/html-data](https://package.elm-lang.org/packages/choonkeat/html-data/latest/); anyone else should be able to write their own functions to produce text/html or text/plain `String` with different dependencies than what I've chosen.
