# [elm-review-single-use-type-vars-end-with-underscore](https://package.elm-lang.org/packages/lue-bird/elm-review-single-use-type-vars-end-with-underscore/latest/)

[`elm-review`](https://package.elm-lang.org/packages/jfmengels/elm-review/latest/) rule
to make sure that type variables on module scope declarations
which are only used once
are marked with the suffix -\_.

## why would you want this?

-\_ at the end of a type variable is a good indication that it is used only in this one place.

Some types have a lot of type variables, most of them only used once.
If you see a -\_

  - you know not to focus on these
    - -\_ in the result: can be inferred as anything
    - -\_ in an argument: anything allowed
  
  - through the review rule you can make sure that this type variable isn't used anywhere else
    → 2 type variables can't accidentally be the same.

### example

Which one is easier to understand?

```elm
at :
    Nat (ArgIn indexMin minLengthMinus1 indexIfN)
    -> LinearDirection
    -> Arr (In (Nat1Plus minLengthMinus1) maxLength) element
    -> element
```
```elm
at :
    Nat (ArgIn indexMin_ minLengthMinus1 indexIfN_)
    -> LinearDirection
    -> Arr (In (Nat1Plus minLengthMinus1) maxLength_) element
    -> element
```
(from [typesafe-array: Arr.at](https://package.elm-lang.org/packages/lue-bird/elm-typesafe-array/latest/Arr#at))

Once you're used to this, it feels similar to

```elm
at :
    Nat (ArgIn _ minLengthMinus1 _)
    -> LinearDirection
    -> Arr (In (Nat1Plus minLengthMinus1) _) element
    -> element
```

## Provided rules

🔧[`OnlyAllSingleUseTypeVarsEndWith_`](OnlyAllSingleUseTypeVarsEndWith_)
reports in types of module scope declarations

  - single-use type variables that don't have a -\_ suffix
  - multi-use type variables that have a -\_ suffix

## Configuration

```elm
module ReviewConfig exposing (config)

import OnlyAllSingleUseTypeVarsEndWith_
import Review.Rule exposing (Rule)

config : List Rule
config =
    [ OnlyAllSingleUseTypeVarsEndWith_.rule
    ]
```

## Why you might not want this

  - You want to keep the conventional way of naming type variables for consistency?
  - You already use the -\_ suffix in possibly multi-use type variables?
  - You dislike having possibly multi-use -\_ suffixed type variables in your let declarations?

Ultimately, the solution to fix all three
would be an editor extension that de-emphasizes (less contrast, ...) single-use type variables.
