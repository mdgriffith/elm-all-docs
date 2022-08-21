# elm-review-no-primitive-type-alias

Provides [`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rules to point out type aliases to simple primitive types (`String`, `Char`, `Bool`, `Int`, `Float`, `()`).

## Rationale

Type Aliases that point to simple primitive types can give a false sense of security because these type aliases
provide a label that you could use in unintended ways without getting compiler feedback. For example, if you have two type definitions

```elm
type alias UserId = String
type alias ShippingAddress = String
```

Then you could miss out on helpful compiler feedback in the following scenarios:

1. Mistakenly use the type alias `UserId` on a value which actually represents a shipping address, or
2. Mistakenly use the type annotation `String` on a value which is actually a `UserId`
3. Mistakenly label a user ID value with the type `ShippingAddress`
4. Mix up positional arguments with types like `ShippingAddress` and `UserId`, but since they're just `String`s as far as the compiler is concerned, there is no error to let you know.

All of these cases could provide you with more helpful compiler feedback if you use custom types like 

```elm
type UserId = UserId String
```

and

```elm
type ShippingAddress = ShippingAddress String
```

instead.

See a more in-depth discussion in [the Elm Radio episode about Primitive Obsession](https://elm-radio.com/episode/primitive-obsession).



## Provided rules

- [`NoPrimitiveTypeAlias`](https://package.elm-lang.org/packages/dillonkearns/elm-review-no-primitive-type-alias/1.0.0/NoPrimitiveTypeAlias) - Reports type aliases for simple primitive types.


## Configuration

```elm
module ReviewConfig exposing (config)

import NoPrimitiveTypeAlias
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ NoPrimitiveTypeAlias.rule
    ]
```


## Try it out

You can try the example configuration above out by running the following command:

```bash
elm-review --template dillonkearns/elm-review-no-primitive-type-alias/preview
```
