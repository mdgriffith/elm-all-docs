# elm-yet-another-polling
Yet Another Polling package with
* min and max retry time intervals
* and backing-off strategy.

You define
* a function creating tasks to attempt (mostly HTTP task, but it could
  also be something else),
* another function that interprets the results of such task and decides
  how to continue with polling,
* and finally a function to turn the results of your task into a message
  of yours.

You must feed back the result to the `update` method, and that's it.

## Demo

There is no live demo for this package, you need to build and set up
[this demo](https://github.com/dosarf/elm-activemq/tree/master/demo) according to
its instructions.
* That demo polls an ActiveMQ service, via its REST API, using this package
  to organize the polling loop.
