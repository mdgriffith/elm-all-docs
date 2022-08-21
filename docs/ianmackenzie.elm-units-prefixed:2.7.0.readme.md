# `elm-units-prefixed`

This is a [prefixed](https://github.com/pd-andy/elm-package-prefixer) version of
[elm-units](https://package.elm-lang.org/packages/ianmackenzie/elm-units/latest/).
You should only need this if you run into module name conflicts trying to use
`elm-units` directly.

For example, if you want to use both `elm-units` and [`elm-visualization`](https://package.elm-lang.org/packages/gampleman/elm-visualization/latest/)
in an app that you are developing, you will get a compiler error if you ever try
to write

```elm
import Force
```

since both `elm-units` and `elm-visualization` define a `Force` module and
there is [currently no way to tell the compiler which one you want](https://github.com/elm/compiler/issues/1625).
By using using this package instead of the base `elm-units` package, you can
write

```elm
import Force
```

to get the `Force` module from `elm-visualization` and

```elm
import Units.Force
```

to get the `Force` module from `elm-units`.

Importantly, this is not a _fork_ of `elm-units` - types declared in this
package are simply aliases for the underlying `elm-units` types, and functions
are simply aliases for `elm-units` functions. This means that if you use this
package you can still safely interoperate with other packages that use
`elm-units` directly.
