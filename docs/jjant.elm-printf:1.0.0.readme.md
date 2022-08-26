# Elm printf

This package contains a type-safe version of the famous printf function.

## Examples

```elm

-- C Style printf would look something like
-- 
-- printf "I'm %d and %s is %d y.o" 23 "Mary" 42

-- Here we need to change the syntax a bit
-- The same example looks like
printf (c "I'm " |> ap i |> ap (c " and ") |> ap s |> ap (c " is ") |> ap i |> ap (c " y.o")) 23 "Mary" 42
```
