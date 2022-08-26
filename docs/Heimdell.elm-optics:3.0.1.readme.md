
# What

Minimalistic, but faithful port of [Lens](https://hackage.haskell.org/package/lens) to Elm.

This library provides a way to access and modify elements of data located deeply inside a structure, possibly behind sum types (`Maybe`, `Either`, etc) and/or containers (`Array`, `List`, `Dict`, `Tuple`, etc).
There also are ways to define custom accessors for your own types and compose them with a single `o` operator as you like.

# Example

## Imports
```elm
import Optics.Basic exposing (..)
import Optics.Core exposing (..)
import Dict exposing (Dict)
```

## Data
```elm
type alias Point = { x : Float, y : Float }

type alias Block =
    { mass       : Float
    , components : List (Maybe Point, String)
    }

type alias Model = Dict String Block
```

## Accessors
```elm
y_ : SimpleLens ls { a | y : b } b
y_ = lens .y <| \s a -> { s | y = a }

components_ : SimpleLens ls { a | components : b } b
components_ =
  lens .components (\s a -> { s | components = a })
```

## Reading
```elm
theHighestPoint : Model -> Maybe Float
theHighestPoint model =
    model
    |> getAll (o (o dictValues components_)
                 (o each (o first (o just_ y_)))))
    |> List.maximum
```

## Updating
```elm
moveVertically : Float -> Model -> Model
moveVertically dy model =
    model
    |> over
        (o (o dictValues components_)
           (o each (o first (o just_ y_))))
        (\y -> y + dy)
```

## Workflow

You create accessor using optics from `Optics.Basic` and your own (created by `lens`, `prism`, etc from `Optics.Core`) using composition operator `Optics.Core.o`.

Then you use it with functions like `get`, `getSome`, `getAll`, `over` or `assign`.

The `o` operator is associative, so `(o a (o b c))` is the same as `(o (o a b) c)`.

# Gory details

The one new exported type it defines is

```elm
type Optic pr ls s t a b = ...
```

The `pr` and `ls` are types for proofs that given optic is a "Prism" or a "Lens".

For instance, the type synonym
```elm
type alias Lens ls s t a b = Optic N ls s t a b
```
disables "Prism" behaviour for lens by setting prism proof type as inconstructible type `N`.

The `o` operator has type
```elm
o :  Optic pr ls s t a b
  -> Optic pr ls a b x z
  -> Optic pr ls s t z s
```
so it will, if a lens is on either side, unify `pr` variable of the second optic with `N`.

Basically, `N` will contaminate any `o` chains in a given channel, making some eliminators impossibe to use.

Same goes for prisms - `ls` is set to `N`.

The traversal is when both `ls` and `pr` are set to `N` - for instance, by creating one with `traversal` or by composing a prism with a lens in either direction (e.g. `o first _Just`).

The lens/prism-specific eliminators for the optics (`get`/`review`/`is`) are requiring that the `pr` (or `ls`) should be `()`.