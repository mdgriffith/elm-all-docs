# Delm Concept Libraries

These libraries power the delm interpreter.

It provides a interactive UI and standard libraries.


## Default Imports

It's normal for every Delm Contract to use this package like this:

```elm
import Concept.Contract
    exposing
        ( Basic(..)
        , Contract
        , FunctionIO(..)
        , Interface(..)
        , InterfaceIO(..)
        , deploy
        )
import Concept.Core exposing (Address, Global, Requirements, throw, zeroAddress)
import Concept.DefaultValues as Default
import Concept.Mapping as Mapping exposing (Mapping(..))
```

Make sure to follow the delm interpreter
