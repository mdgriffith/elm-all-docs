> **Moved into [bounded-nat](https://package.elm-lang.org/packages/lue-bird/elm-bounded-nat/latest/).**

```elm
type alias Nat192Plus more =
    S (S ... (S more)...)
```

improved compiling performance drastically over

```elm
type alias Nat192Plus more =
    Nat191Plus (S more)
```

-------

This package shouldn't have to exist.

It supplies the package [elm-bounded-nat](https://package.elm-lang.org/packages/lue-bird/elm-bounded-nat/latest/) with shortened names.

A natural number type could be build like this:

```elm
module N exposing (...)

type S more = ...
type Z = ...

type alias Nat1Plus more =
    S more

type alias Nat2Plus more =
    Nat1Plus (S more)

...

type alias Nat192Plus more =
    Nat191Plus (S more)
```

Elm cashes this in `elm-stuff` like this:

```noformatingples
Nat100Plus??????nlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNSlue-birdelm-bounded-natNS
lue-birdelm-bounded-natNZlue-birdelm-bounded-natTypeNats.............
```

Every alias gets expanded instantly. This gets extremely long extremely fast!

As a result, `elm-stuff` is likely to corrupt & the compilation is slow.

What could shorten it down?
- `NS` `NZ` are very common, but we can't shorten these any further
- `lue-birdelm-bounded-nat` fills nearly every character!
    - if we replaced every


    lue-birdelm-bounded-nat

with

    indiquen

we would save a ton of space.

```noformatingples
Nat100Plus??????nindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNS
indiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNS
indiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNS
indiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNS
indiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNSindiquenNS
indiquenNSindiquenNZindiquenTypeNats.........
```

I'm very sad to say that this is significantly better :(
