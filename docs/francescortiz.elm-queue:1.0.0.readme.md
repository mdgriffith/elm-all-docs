# elm-queue

Implementation of a general purpose queue with a pool.

I have seen other queue implementations, but they were to focused on a way of working (like using timers) or they were
focused only on enqueuing and dequeuing. This queue provides a pool, which is good when you have to do parallel tasks
like HTTP requests. You don't want to have more than 10 or 20 o 30 concurrent requests on you application. This package
helps keep the number of parallel tasks limited to a specific pool size.

Also, as a comodity, the package also provides a queue that is just a simple FIFO implementation, but that follows the
same function signatures. This allows you to have throttling without having to learn how another package works. Either
you used an Queue if you want a pool size or an QueueUnkeyed. The function names also change with the suffix "xxxxUnkeyed"
for unkeyed queues, but if there is a good reason to use a different naming convention I am open to suggestions.

Check the [full docs](https://package.elm-lang.org/packages/francescortiz/elm-queue/latest/Queue).
