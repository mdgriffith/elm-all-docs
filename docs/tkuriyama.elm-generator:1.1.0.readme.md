
# elm-generator

This library provides a way to simulate lazy lists, or streams, in the form of generators.

The interface for generators is similar to a subset of Haskell's [`Data.List.Stream`](https://hackage.haskell.org/package/stream-fusion-0.1.2.5/docs/Data-List-Stream.html).

## Example


The below example shows a classic construction of the Fibonacci (infinite) sequence:

```elm
> import Generator as G
> fib = G.iterate (\(a, b) -> (b, b + a)) (0, 1)
> G.take 10 fib
[(0,1),(1,1),(1,2),(2,3),(3,5),(5,8),(8,13),(13,21),(21,34),(34,55)]
> G.map Tuple.first fib |> G.take 10
[0,1,1,2,3,5,8,13,21,34]
```

## Design Considerations

Since `Lazy` has been eliminated in Elm 0.19, the goal is to provide a convenient way to model lazy lists, or streams.

Generators can be transformed and combined (e.g. `map`, `zip`, etc) in constant time, with computation performed only when a generator is explicitly advanced.

Unlike streams, generators can be either finite or infinite. A finite generator that has reached its logical end is "empty" and simply emits no further values. (The library supplies an `empty` predicate function, but it should rarely be needed as library functions are agnostic to finite or infinite generators.)

Note that the Elm compiler is still strict. So, even using the generator interface, it's not possible to define infinitely recursive functions that work in languages like Haskell. 

```elm
-- this still doesn't compile!
ruler =
    G.interleave (G.repeat 0) (G.map ((+) 1) ruler)
```

As an example of an iterative formulation of a function that's often defined recursively, see the Sieve of Eratosthenes in [`Examples/Primes.elm`](https://github.com/tkuriyama/elm-generator/blob/master/src/Examples/Primes.elm). 


## Further Examples

In addition to inline tests in the module documentation, the repo contains several [`examples`](https://github.com/tkuriyama/elm-generator/tree/master/src/Examples) for how to use generators.

## Build

For developers: to follow the "full" build for this repo, run the commands in the `all.do` script (`redo all` if you have [`redo`](https://redo.readthedocs.io/en/latest/), or run it as a shell script like `sh all.do`).

See [this page](https://tkuriyama.github.io/general/2021/04/22/Building-Elm.html) for an explanation of the build steps and dependencies.
