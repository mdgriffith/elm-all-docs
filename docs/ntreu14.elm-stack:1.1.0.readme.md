# Stack

An implementation of a generic stack data structure in Elm.

Please file any issues [here](https://github.com/ntreu14/elm-stack/issues).

Feedback and contributions are welcome!

# Example

A stack is used to represent a Last-In, First-Out (LIFO) collection of values.

Here is a very simple example of a `Stack` with what the state of the `Stack` would be along the way:

```elm
Stack.empty               -- Stack []
  |> Stack.push "World!"  -- Stack ["World!"]
  |> Stack.push "Hello"   -- Stack ["Hello", "World!"]
  |> Stack.pop            -- (Just "Hello", Stack ["World!"])
```