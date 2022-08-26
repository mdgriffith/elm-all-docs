# elm-flat-map

An Elm package to implement flatMap over various Elm types and parameter counts.

So far this is just implemented for Lists and Maybes.

In my experience the most common use case is when `map`ping over multiple `Maybe`s at once returns a `Maybe`.  In this case you can use `flatMap2` and get back a `Maybe a` instead of a `Maybe (Maybe a)`, which you very rarely want.  Note that `flatMap` is included for completeness, but its identical to `Maybe.andThen`.
