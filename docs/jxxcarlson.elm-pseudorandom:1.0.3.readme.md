
# Pseudorandom

PseudoRandom is a package for creating lists of pseudorandom numbers — lists of integers or floats that resemble lists produced by random means, even though they are generated deterministically.  This resemblance can be made precise using various statistical tests.

In this connection, we repeat John von Neumann's joke: *Anyone who attempts to generate random numbers by deterministic means is, of course, living in a state of sin.*

**Examples:**

```
  floatSequence 3 7 (0, 1) |> List.map (roundTo 4)
    == [0.448,0.0988,0.246]

  integerSequence 3 8
    == [123092948, 28845728, 98310392]
```

**NOTE:** the seed must be a positive integer.

We use the linear congruential generator of Lewis, Goodman, and Miller (1, section 3.2.1) for the integerSequence function. For floatSequence we use the triple linear congruential generator of (1, section 3.2.3).  Reference (2) gives tables of parameters for linear congruential generator in case you want to "roll you own."

**FURTHER NOTE**

Ilias van Peer pointed out to me that one can get the same functionality as above using the `step` function of the standard `elm/random` library — with a bonus of a five to eight-fold increase in speed.  The function `RNG.floatSequence`, based on Ilias' code, is a drop-in replacement for `PseudoRandom.floatSequence`. The function `RNG.floatSequence_` allows one to keep track of the seed if that is desired a well.

I recommend using `Random + RNG` rather than `PseudoRandom`.


```
module RNG exposing (floatSequence, floatSequence_)
import Random

{-

Example:

> RNG.floatSequence 3 23 (0,1)
[0.07049563320325747,0.8633668118636881,0.6762363032990798]

-}

floatSequence : Int -> Int -> (Float, Float) -> List Float
floatSequence n k (a,b) =
    floatSequence_ n (makeSeed k) (a,b)
      |> Tuple.first

floatSequence_ : Int -> Random.Seed -> (Float, Float)
                -> (List Float, Random.Seed)
floatSequence_ n seed (a,b) =
    Random.step (gen n (a,b)) seed

gen : Int -> (Float, Float) -> Random.Generator (List Float)
gen n  (a, b) =
    Random.list n (Random.float a b)

makeSeed : Int -> Random.Seed
makeSeed k =
    Random.initialSeed k
```

**References**

1.  <https://www.math.arizona.edu/~tgk/mc/book_chap3.pdf>

2.  <http://www.ams.org/journals/mcom/1999-68-225/S0025-5718-99-00996-5/S0025-5718-99-00996-5.pdf>

3.  Von Neumann, John (1951). "Various techniques used in connection with random digits" (PDF). National Bureau of Standards Applied Mathematics Series. 12: 36–38.
