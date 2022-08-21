# elm-activemq

ActiveMQ has, in addition to its JMS implementation, a
[REST API](https://activemq.apache.org/rest).

This package provides a simple wrapper for that REST API. You can
* publish
* and consume JMS messages.

## Gotchas

### Cancelling HTTP requests to consume

The Active MQ (5.15.9) REST API implementation creates a consumer, which, even
if the HTTP request itself is cancelled, will time out at its own pace. Messages
arriving _after_ the HTTP request are cancelled but _before_ the JMS consumer
times out will be lost. So don't cancel them HTTP requests.

Using different consumption techniques, like
[`clientId`](https://activemq.apache.org/rest#consuming-without-sessions) or
[`oneShot=true`](https://activemq.apache.org/rest#consuming-with-one-shot-consumers)
both produced the same results.

### Cross-Origin Resource Sharing

Chances are you need to set up
[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
correctly.


## Demo app

There is no live demo you can go to (sorry), as this package needs an
ActiveMQ service installation.

You need to build and set up the [demo](https://github.com/dosarf/elm-activemq/tree/master/demo)
according to its instructions.
