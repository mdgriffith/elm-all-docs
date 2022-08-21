# Elm StandardAPI Package

A package for interacting with a [StandardAPI](https://github.com/waratuman/standardapi)
backend.

# Example

```elm
import StandardApi
import Url.Builder exposing (QueryParameter)

apiConfig =
    { url =
        { protocol = Https
        , host = "example.com"
        , port_ = Nothing
        , path = ""
        , query = Nothing
        , fragment = Nothing
        }
    , headers =
        [ ( "Api-Key", "[TOKEN]" )
        ]
    , format = "application/json"
    , version = "0.1.0"
    , timeout = Nothing
    }

schemaRequest =
    StandardApi.schemaRequest apiConfig
        { msg = ReceivedSchema >> InternalMsg
        , tracker = tracker
        }

accountsRequest :
    Model
    -> (Result Mls.Error (List ( Account, Email )) -> a)
    -> Cmd a
accountsRequest model msg =
    StandardApi.request apiConfig
        { url =
            Url.Builder.absolute [ "accounts" ]
                ( StandardApi.limit (Just 20)
                ++ StandardApi.order [ ( "created_at", Desc ) ]
                ++ StandardApi.int [ "login_count" ] [ Gte 100 ]
                ++ [ Url.Builder.string "include[emails][where][primary]" "true" ]
                )
        , msg = msg
        , decoder =
            Decode.list
                (Account.decoder
                    |> Decode.andThen
                        (\account ->
                            Decode.map (\email -> ( account, email ))
                                (Decode.field "emails" (Decode.index 0 Email.decoder))
                                (Subject.withTaskDecoder t |> Decode.field "subject")
                        )
                )
        , tracker = Nothing
        }

accountsHttpRequest :
    Model
    -> (Result Mls.Error (List ( Account, Email )) -> a)
    -> Cmd a
accountsHttpRequest model msg =
    Http.get
        { url =
            Url.Builder.absolute [ "accounts" ]
                [ Url.Builder.string "include[emails][where][primary]" "true"
                , Url.Builder.string "include[emails][limit]" "1"
                ]
        , msg = msg
        , decoder =
            Decode.list
                (Account.decoder
                    |> Decode.andThen
                        (\account ->
                            Decode.map (\email -> ( account, email ))
                                (Decode.field "emails" (Decode.index 0 Email.decoder))
                                (Subject.withTaskDecoder t |> Decode.field "subject")
                        )
                )
        , tracker = Nothing
        }
```
