[billstclair/elm-websocket-framework package](http://package.elm-lang.org/packages/billstclair/elm-websocket-framework/latest) at elm-lang.org

A websocket-based client/server framework written almost entirely in Elm.

This package is the client side. The server side is in [billstclair/elm-websocket-framework-server](http://package.elm-lang.org/packages/billstclair/elm-websocket-framework-server/latest).

You design your protocol, write JSON encoders and decoders for it, the server logic to use it to transform state, and the client logic to provide a user interface, and this package does the rest.

The server side depends on [Node.js](https://nodejs.org/).

For single-player use, and development, you can wrap your server-side code for client use, in `elm-reactor` if you want, then switch easily to using a real remote server.

I have used this basic technology for both my [Spokes](https://gibgoygames.com/spokes/) and [Archmage](https://gibgoygames.com/archmage/) games. I made the Archmage version by copying and modifying the Spokes version. Then I generalized the ideas, and have used it so far in [Zephyrnot](https://zephyrnot.com), [JSMaze](https://jsmaze.com), and [AGOG](https://agog.ninja).

See the README in the [Example](https://github.com/billstclair/elm-websocket-framework/tree/master/example) directory for instructions on building and running the examples.

Happy Hacking!

Bill St. Clair
31 March 2018
