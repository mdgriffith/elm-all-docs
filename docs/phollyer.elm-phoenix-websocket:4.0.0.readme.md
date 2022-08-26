# Elm 0.19.x package for Phoenix WebSockets

A very simple to use Package that provides your Elm program access to the
PhoenixJS API.

In order for your Elm program to talk to PhoenixJS, you will need to add a
JavaScript file to your Phoenix project and a very small Port module to your
Elm `src` files.

## Set up JavaScript

The JS file you need, and set up instructions are
[`here`](https://github.com/phollyer/elm-phoenix-websocket/tree/master/js).

## Set up the Ports

The Port module you need, and set up instructions are
[`here`](https://github.com/phollyer/elm-phoenix-websocket/tree/master/ports).

## Install the package

    elm install phollyer/elm-phoenix-websocket

## Examples

A Phoenix application that provides an Elm SPA with a dozen examples can be found
[here](https://github.com/phollyer/elm-phoenix-websocket-example).

The relevant Elm files for the examples are
[here](https://github.com/phollyer/elm-phoenix-websocket-example/tree/master/assets/elm/src/Example).

A live version of the example application is running
[here](http://elm-phoenix-websocket-example.hollyer.me.uk).

## Further Reading

Package [docs](https://package.elm-lang.org/packages/phollyer/elm-phoenix-websocket/latest/Phoenix).

For more information about Phoenix WebSockets see
[Phoenix.Channel](https://hexdocs.pm/phoenix/1.5.3/Phoenix.Channel.html#content)
, [Phoenix.Presence](https://hexdocs.pm/phoenix/1.5.3/Phoenix.Presence.html#content)
and [PhoenixJS](https://hexdocs.pm/phoenix/js).

## Roadmap

- Add `pushSequence` function. I would like to add the ability to provide a list of pushes that will be actioned in sequence. This will need to handle some decision making based
  on if a push succeeds, errors, or results in a timeout. I will be looking into this as soon as I am able to find the time. Pull requests are welcome.
