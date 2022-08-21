XmlParser
====

[![Main Workflow](https://github.com/miniBill/elm-xml-parser/actions/workflows/main.yml/badge.svg)](https://github.com/miniBill/elm-xml-parser/actions/workflows/main.yml)

XML Parser for Elm

## How to use

There is only two functions available.

```elm
parse : String -> Result Parser.Error Xml
format : Xml -> String
```

Typically, you'll use `parse` function, get the root node and traverse it.

```elm
> import XmlParser
> XmlParser.parse """<a name="value">foo</a>"""
Ok { processingInstructions = [], docType = Nothing, root = Element "a" ([{ name = "name", value = "value" }]) ([Text "foo"]) }
```

I'm not going to make decoder and encoder right now. Please let me know if you are interested :)

## LICENSE & NOTICE

BSD-3-Clause

Originally developed by [jinjor](https://github.com/jinjor) (2017).

This is a fork by [miniBill](https://github.com/miniBill) (2022) starting from 2.0.0, aiming:

* to accept pending fixes, and
* to change all the recursions with loops for stack safety.

Decoder facilities are already available in [elm-xml-decode](https://github.com/ymtszw/elm-xml-decode).
