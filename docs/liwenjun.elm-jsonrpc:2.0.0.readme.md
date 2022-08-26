# Elm JsonRpc

一个通用的 JsonRpc-V2 调用接口，帮助实现 JsonRpc 客户端应用。

## 使用范例

```elm
import Json.Decode as D
import Json.Decode.Pipeline exposing (required)
import Json.Encode as E
import JsonRpc exposing (RpcData, call)

type alias User =
    { username : String
    , password : String
    }

decoder : D.Decoder User
decoder =
    D.succeed User
        |> required "username" D.string
        |> required "password" D.string


{-| 用户登录
-}
signin :
    { user : { user | username : String, password : String }
    , url : String
    , toMsg : RpcData String -> msg
    }
    -> Cmd msg
signin ops =
    call
        { url = ops.url
        , token = Nothing
        , method = "user.signin"
        , params =
            [ ( "password", E.string ops.user.password )
            , ( "username", E.string ops.user.username )
            ]
        , decoder = D.string
        , toMsg = ops.toMsg
        }


{-| 注册新用户
-}
signup :
    { user : { user | username : String, password : String }
    , url : String
    , token : Maybe String
    , toMsg : RpcData Int -> msg
    }
    -> Cmd msg
signup ops =
    call
        { url = ops.url
        , token = ops.token
        , method = "user.signup"
        , params =
            [ ( "password", E.string ops.user.password )
            , ( "username", E.string ops.user.username )
            ]
        , decoder = decoder
        , toMsg = ops.toMsg
        }
```
