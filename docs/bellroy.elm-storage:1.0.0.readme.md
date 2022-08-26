# elm-storage

Store different type of values inside a single type

# Motivation

This can be useful when building up a Storage of configuration item.

## example

```elm
import Storage
import Storage.Value as Value

configuration: Storage
configuration =
    Storage.fromList [
      ("config.item.a", Value.string "some value")
    , ("config.item.b", Value.float 1.5)
    ]


Storage.getString "config.item.a" configuration
-- Just "some value"

Storage.getString "config.item.b" configuration
-- Nothing

Storage.getStringUnsafe "config.item.a" configuration
-- "some value"

Storage.getStringUnsafe "config.item.b" configuration
-- "1.5"

Storage.getFloat "config.item.a" configuration
-- Nothing

Storage.getFloat "config.item.b" configuration
-- Just "1.5"

 ```