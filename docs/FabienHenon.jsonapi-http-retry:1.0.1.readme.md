# jsonapi-http-retry

Retry failed jsonapi requests with retry policies.

It is greatly inspired by the [`Retry` package](https://package.elm-lang.org/packages/choonkeat/elm-retry/latest/) but aims to handle http requests from the [`jsonapi-http` package](https://package.elm-lang.org/packages/calions-app/jsonapi-http/latest/).

With this package you can add retry policies to [`jsonapi-http`](https://package.elm-lang.org/packages/calions-app/jsonapi-http/latest/) requests errors.
You can choose specific errors that will trigger a retry: unauthenticated error, network error, etc...

You can also send `Cmd`s between 2 failures with the `Http.CmdRetry` module.

## Getting Started

Here is an example retrying requests 5 times maximum with a constant interval between retries, only for unauthenticated and unauthorized errors:

```elm
import Http.Request
import Http.Retry
import Json.Encode
import JsonApi.Decode

request : Cmd Msg
request =
    Request.request
        { url = "http://endpoint"
        , headers = []
        , body = Json.Encode.object []
        , documentDecoder = JsonApi.Decode.resources "resource-type" entityDecoder
        }
        |> Http.Retry.with
            [ Http.Retry.maxRetries 5
            , Http.Retry.exponentialBackoff { interval = 500, maxInterval = 3000 }
            ]
            [ Http.Retry.onUnauthenticatedStatus
            , Http.Retry.onUnauthorizedStatus
            ]
        |> Task.perform OnTaskCompleted
```
