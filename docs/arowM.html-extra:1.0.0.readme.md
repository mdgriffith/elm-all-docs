# elm-community/html-extra for arowM/html

An elm-community/html-extra alternative which uses `Attribute msg` type specially defined in [arowM/html](https://github.com/arowM/html).
The compatible elm-community/html-extra version is `3.1.1`.

This package contains convenience functions for working with Html, beyond that which elm-lang/html provides.

## Migrating from elm-community/html-extra

All you need to do for migrating from elm-community/html-extra is just replacing dependencies in your `elm.json` to `arowM/html-extra`.
If you have not yet updated `elm/html` to `arowM/html`, do it together.
Then compiler would claim you to add "indirect" dependencies when trying to compile.

Let's see you have following `elm.json` file:

```elm
{
    ...
    "dependencies": {
        "elm/core": "1.0.0 <= v < 2.0.0",
        "elm/html": "1.0.0 <= v < 2.0.0",
        "elm/json": "1.1.3 <= v < 2.0.0",
        "elm-community/html-extra": "3.1.1 <= v < 4.0.0"
    },
    ...
}
```

In this case, just replace "elm/html" with "arowM/html":

```elm
{
    ...
    "dependencies": {
        "elm/core": "1.0.0 <= v < 2.0.0",
        "arowM/html": "1.0.0 <= v < 2.0.0",
        "elm/json": "1.1.3 <= v < 2.0.0",
        "arowM/html-extra": "1.0.0 <= v < 2.0.0"
    },
}
```

The compiler would claim you to add some indirect dependencies.

```
{
    ...
    "indirect": {
        ...
        "arowM/elm-html-internal": "1.0.0",
        "arowM/elm-html-extra-internal": "1.1.0",
        "elm/html": "1.0.0"
        "elm/html-extra": "3.1.1"
    }
    ...
}
```

It's all!

Make sure to remove `elm-stuff` directory before compiling to avoid build errors.

## Other things

The other things are same as `elm-community/html-extra`.
So please see [its README](https://package.elm-lang.org/packages/elm-community/html-extra/3.1.1/) for details if you are not familiar with `elm-community/html-extra`.
