# Effects.MsgFromJs

Message from JS system is used to listen for messages from JS and decode them to Elm messages.

It's an example usage of [Effects](https://package.elm-lang.org/packages/ContaSystemer/elm-effects/latest/) package.

## Usage

A system may subscribe for messages from JS with `subscribe` function

```elm
module ChildSystemA exposing (Msg, msgFromJsEffects)

import Effects.MsgFromJs


type Msg
    = ReceivedMessageForSystemA Int
    | ReceivedSharedMessage


msgFromJsEffects : Effects.MsgFromJs.Effects Msg
msgFromJsEffects =
    MsgFromJs.subscribe "System A"
        [ ( "MessageForSystemA"
            , MsgFromJs.decode ReceivedMessageForSystemA Decode.int
            )
        , ( "SharedMessage"
            , MsgFromJs.succeed ReceivedSharedMessage
            )
        ]
```

```elm
module ChildSystemB exposing (Msg, msgFromJsEffects)

import Effects.MsgFromJs


type Msg
    = ReceivedMessageForSystemB String
    | ReceivedSharedMessage


msgFromJsEffects : Effects.MsgFromJs.Effects Msg
msgFromJsEffects =
    MsgFromJs.subscribe "System B"
        [ ( "MessageForSystemB"
            , MsgFromJs.decode ReceivedMessageForSystemB Decode.string
            )
        , ( "SharedMessage"
            , MsgFromJs.succeed ReceivedSharedMessage
            )
        ]
```

Another system may process message from JS effects

```elm
module MainSystem exposing (processMsgFromJs)

import ChildSystemA
import ChildSystemB
import Effects
import Effects.MsgFromJs


type Msg
    = ChildSystemAMsg ChildSystemA.Msg
    | ChildSystemBMsg ChildSystemB.Msg
    | MsgFromJs (List Msg) -- In update function each message can be dispatched with `Task.perform identity (Task.succeed msg)`
    | LogError String -- Error can be logged somewhere


{-| This function can be used with ports subscription
-}
processMsgFromJs : JsData.JsData -> Msg
processMsgFromJs =
    MsgFromJs.decodeJsData MsgFromJs LogError <|
        Effects.batch
            [ Effects.MsgFromJs.map ChildSystemAMsg ChildSystemA.msgFromJsEffects
            , Effects.MsgFromJs.map ChildSystemBMsg ChildSystemB.msgFromJsEffects
            ]
```

## Why not just use ports subscription?

In some situations it make sense to limit system subscriptions.
E.g. when one wants to make sure a system works only with messages from JS and no other subscriptions used.