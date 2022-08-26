## alternative-benchmark-runner

Extends [elm-explorations/benchmark](https://package.elm-lang.org/packages/elm-explorations/benchmark/latest/):

- [compare _multiple_ benchmarks](https://github.com/elm-explorations/benchmark/issues/2)
- run in a cleaner interface
    - dark and light mode

![Benchmark example](https://raw.githubusercontent.com/lue-bird/alternative-benchmark-runner/master/benchmark-example.png)

- [warn about low goodness of fit](https://github.com/elm-explorations/benchmark/issues/4)
- compatible with all your existing benchmarks. Simply replace `Benchmark.Runner.program` with `Benchmark.Runner.Alternative.program`

```elm
import Benchmark exposing (describe)
import Benchmark.Alternative exposing (rank)
import Benchmark.Runner.Alternative as BenchmarkRunner


main =
    BenchmarkRunner.program suite

suite =
    describe "array"
        [ rank "range from 0"
            (\f -> f 100)
            [ ( "with initialize", from0WithInitialize )
            , ( "with List.range", from0WithListRange )
            , ( "with indexedMap", from0WithIndexedMap )
            ]
        ]

from0WithInitialize length =
    Array.initialize length identity

from0WithListRange length =
    Array.fromList (List.range 0 (length - 1))

from0WithIndexedMap length =
    Array.repeat length ()
        |> Array.indexedMap (\i _ -> i)
```

To customize the options:

```elm
import Benchmark.Runner.Alternative as BenchmarkRunner exposing (defaultOptions, lightTheme)

main =
    BenchmarkRunner.programWith
        { defaultOptions | theme = lightTheme }
        suite
```

Have suggestions? → [contributing](https://github.com/lue-bird/elm-alternative-benchmark-runner/blob/master/contributing.md).
