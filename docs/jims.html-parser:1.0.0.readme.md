# html-parser 

Parse HTML 5 in Elm 0.19.1!

```elm
import Html.Parser

Html.Parser.run "<div><p>Hello, world!</p></div>"
-- => Ok [ Element "div" [] [ Element "p" [] [ Text "Hello, world!" ] ] ]
```

## Fork notes
This is just a fork for having a working version of the [`hecrj/html-parser`][hecrj] package in elm 0.19.1 that is published.
If you find that this package is obsolete, please contact me and I'll remove it :)

## Limitations
  * `<script>` tags are not fully supported.
  * SVG is not supported.

Feel free to contribute!


## Contributing / Feedback

Feel free to fork and open issues or pull requests. You can also contact me (@hecrj)
on the [Elm Slack][elm-slack]. I am always happy to talk!


## Credits
  * [`jinjor/elm-html-parser`][jinjor] for most of the tests.

[elm-slack]: https://elmlang.herokuapp.com
[jinjor]: https://github.com/jinjor/elm-html-parser
[hecrj]: https://github.com/hecrj/html-parser
