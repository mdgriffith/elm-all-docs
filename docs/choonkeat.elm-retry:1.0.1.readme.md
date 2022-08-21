# elm-retry

Add retries to your task

``` elm
-- before
originalTask
    |> Task.attempt DidTask


-- after
originalTask
    |> Retry.with [ Retry.maxDuration 7000
                  , Retry.constantInterval 800
                  ]
    |> Task.attempt DidTask
```

## Installation

``` sh
$ elm install choonkeat/elm-retry
```

## Building & Testing

Elm cannot test `Task` yet, but you can

1. Fire up `elm reactor` from inside `examples/`

    ``` sh
    $ cd examples/; elm reactor
    ```

1. Visit [http://localhost:8000/](http://localhost:8000/) and pick any file in `src/`
1. Open your browser's developer / javascript console to see the output

## License

Copyright © 2019 Chew Choon Keat

Distributed under the MIT license.
