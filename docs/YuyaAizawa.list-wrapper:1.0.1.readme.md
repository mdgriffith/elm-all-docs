# list-wrapper

This package including below data structures implemented by simple list.

- ListWrapper.Dict
- ListWrapper.Set

You can use custom types for their keys or elements.

```elm
import ListWrapper.Set exposing (..)

type Key
  = A
  | B
  | C

allKeys =
  Set.fromList [ A, B, C ]
```