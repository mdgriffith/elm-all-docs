# elm-multi-dict

A data structure for representing one-to-many relationships as a `Dict` of `Set`s of
values.

This means that you can set multiple values against the same key. When that key is retrieved
all of the values set against it will be provided as a `Set`. The boiler plate code to create
and manage the sets is handled internally.

A function must be supplied to map the values onto `comparable`s, so that they can be placed
into the `Set`. This is because the `eeue56/elm-all-dict` package is deprecated, and the new
hash-tables package has yet to be released.
