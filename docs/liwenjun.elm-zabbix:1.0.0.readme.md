# Elm Zabbix

一个通用的Zabbix-API调用接口，帮助实现定制开发Zabbix客户端应用。

## 使用范例

```elm
-- Host.elm

type alias Host =
    { hostid : String
    , host : String
    , name : String
    }

hostDecoder : D.Decoder Host
hostDecoder =
    D.succeed Host
        |> required "hostid" D.string
        |> required "host" D.string
        |> required "name" D.string

params : List String -> List ( String, E.Value )
params groupids =
    [ ( "output", E.list E.string [ "host", "name" ] )
    , ( "selectItems", E.string "count" )
    ]

get_hosts :
    { conf : { conf | url : String, token : Maybe String }
    , toMsg : RpcData Hosts -> msg
    }
    -> Cmd msg
get_hosts opts =
    call
        { url = opts.conf.url
        , token = opts.conf.token
        , method = "host.get"
        , params = params opts.groupids
        }
        (D.list hostDecoder)
        opts.toMsg


-- Main.elm

type alias Model =
    { host : List Host
    }

init : ( Model, Cmd Msg )
init =
    ( Model []
    , Host.get_hosts
        { conf = conf
        , toMsg = GotHosts
        }
    )

type Msg
    = GotHosts (RpcData (List Host))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotHosts data ->
            case data |> flat |> toResult of
                Ok d -> ( { model | host = d }, Cmd.none)
                Err _ -> ( model, Cmd.none )
```
