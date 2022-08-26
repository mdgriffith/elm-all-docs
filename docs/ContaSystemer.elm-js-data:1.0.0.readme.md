# JsData

The package contains a module with data structure to communicate with JavaScript over ports.

Usually one would set one incoming port and one outgoing port with generic data passing through.

```elm
import JsData


{-| Outgoing port
-}
port msgToJs : JsData.JsData -> Cmd msg


{-| Incoming port
-}
port msgFromJs : (JsData.JsData -> msg) -> Sub msg
```

For more inspiration take a look at [great talk by Murphy Randle](https://www.youtube.com/watch?v=P3pL85n9_5s).