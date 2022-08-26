[billstclair/elm-mastodon-websocket](https://package.elm-lang.org/packages/billstclair/elm-mastodon-websocket/latest) is a client for the websocket streaming API to the [Mastodon](https://joinmastodon.org/) social-networking system. The Mastodon API is documented at [docs.joinmastodon.org/api](https://docs.joinmastodon.org/api/streaming/).

The project is separate from [billstclair/elm-mastodon](https://package.elm-lang.org/packages/billstclair/elm-mastodon/latest), because it requires ports for the websockets, and other uses of `elm-mastodon` do not.

See the `example` directory for how to define the ports and to configure the application to use the JavaScript for websockets and localStorage.

# Running tests

```
cd .../elm-mastodon-websocket
elm-test
```
