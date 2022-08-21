# elm-parser-test

[![Build Status](https://travis-ci.org/arowM/elm-parser-test.svg?branch=master)](https://travis-ci.org/arowM/elm-parser-test)

Helper functions to develop/test your own parser using elm/parser.
It checks whether the result of parser is [backtrackable](https://github.com/elm/parser/blob/master/semantics.md) or not.

```elm
run (keyword "import") "imp"
--> (Err _, True)
-- This is equival to `ERR{true}` in the notation of Semantics document.
-- https://github.com/elm/parser/blob/master/semantics.md

run (keyword "import") "import"
--> (Ok (), False)
-- This is equival to `OK{false}`.

run spaces "  "
--> (Ok (), False)

run (backtrackable spaces) "  "
--> (Ok (), True)
-- This is equival to `OK{true}`.
```
