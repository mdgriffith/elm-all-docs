# Queue

[![Build Status](https://travis-ci.com/owanturist/elm-queue.svg?branch=master)](https://travis-ci.com/owanturist/elm-queue)

Simple **FIFO** (first-in first-out) queue data structure.
First element added to the `Queue` is the first one to be removed.
The implementation has almost the same API as [`List`](https://package.elm-lang.org/packages/elm/core/latest/List).

```bash
elm install owanturist/elm-queue
```

If you need double-ended queue please check out [Skinney/elm-deque](https://package.elm-lang.org/packages/Skinney/elm-deque/latest/) implementation.

Feedback and contributions of any kind a very welcome!


## Example

```elm
queue : Queue Int
queue =
    Queue.empty
        |> Queue.enqueue 1 -- Queue.fromList [ 1 ]
        |> Queue.enqueue 2 -- Queue.fromList [ 2, 1 ]
        |> Queue.enqueue 3 -- Queue.fromList [ 3, 2, 1 ]


headQueue : Maybe Int
headQueue =
    Queue.head queue -- Just 1


dequeueQueue1 : ( Maybe Int, Queue Int )
dequeueQueue1 =
    Queue.dequeue queue         -- (Just 1, Queue.fromList [ 3, 2 ])


dequeueQueue2 : ( Maybe Int, Queue Int )
dequeueQueue2 =
    Queue.dequeue dequeueQueue1 -- (Just 2, Queue.fromList [ 3 ])


dequeueQueue3 : ( Maybe Int, Queue Int )
dequeueQueue3 =
    Queue.dequeue dequeueQueue2 -- (Just 3, Queue.fromList [])


dequeueQueue4 : ( Maybe Int, Queue Int )
dequeueQueue4 =
    Queue.dequeue dequeueQueue2 -- (Nothing, Queue.fromList [])

```


## Performance

The implementation uses pair of `List`s and a peek value for non-empty case.
Due to the peek value it takes constant time `O(1)` to take a look for `Queue.head`.
Lists are used to store incoming and outcomint values.
Incoming are stored in natural order and outcoming in reversed one.

Each time when `Queue.enqueue` happens the value goes to incoming list for constant `O(1)` time.

Each time when `Queue.dequeue` happens it extracts next item for constant time `O(1)`. Incoming list becomes outcoming by revert if outcoming list is empty. Then head of outcoming list becomes a new peek. So you can notice that rebalancing happens only when outcoming list is empty at takes time proportional to `O(N)`. Otherwise it takes constant time `O(1)`.
