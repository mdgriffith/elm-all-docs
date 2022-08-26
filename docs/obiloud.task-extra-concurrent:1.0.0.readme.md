# task-extra-concurrent

Convenience functions for running concurrent tasks.

## Motivation

Occasionally we have to execute several tasks concurrently. Common use case is uploading batch of files or deleting `n` rows from database. The underlying mechanism for running concurrent tasks is `Cmd.batch`.
This library provides convenient abstraction for running concurrent tasks and accumulating results.


## Example 
Let's break down our process into simple steps. To run `n` number of tasks we need:
* to keep state of all running tasks in a model 
* to update this state when each of the tasks ends with computation
* to accumulate all results when there is no more tasks left to run

This library provides `type Concurrent e a msg` type to help you track state of running tasks in your model. 
For our simple example we'll assume all tasks will either return `Int` or fail and give us back a `String` explaining what went wrong. All tasks will have signature `Task String Int`. Lastly we have to produce a `Msg` to let program know when we are done. 

```elm
type alias Model =
  { runningTasks : Concurrent String Int Msg }
```

We need couple of messages to send back to the program to update the model. Library provides `type Join e a` for returning result of a single thread and to be joined with the rest of the results.

```elm

type Msg
    = OnEach (Join String Int)
    | OnEnd (Result (List String) (List Int))
```

To run tasks we declare following:

```elm 
Task.Extra.concurrent OnEach OnEnd [ task1, task2, ..., taskN ]
```

Call to this function will give us back initial `Concurrent` state to store in our model.

To join our results and check if we are done there is a function `join` that will return updated state and produce Cmd Msg.

```elm
case msg of
    OnEach result -> 
        let 
            ( runningTasks, cmd ) = 
                Task.Extra.join n model.runningTasks
        in 
        ( { model | runningTasks = runningTasks }, cmd )
```

For working example look into `examples` folder. Example illustrates accumulating results of three tasks from which one of the tasks fails.