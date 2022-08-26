# RateLimiter

This package lets you put a cap on the number of requests during a given period. Mostly useful to prevent abuse and therefor most useful in standalone apps or on a server.
Currently only a sliding log limiter is implemented.

## Getting started

### Example code

The following is an example of its usage:

```
module Example exposing (..)

import Browser
import Html exposing (Html)
import Http
import RateLimiter


type Msg
    = RLMsg RateLimiter.Msg
    | ExpensiveOperation String
    | RequestCompleted (Result Http.Error ())


type alias Model =
    { rateLimiter : RateLimiter.RateLimiter String }


main = Browser.element
    { init = \_ -> ( { rateLimiter = RateLimiter.slidingLog 5 (RateLimiter.minutes 5) }, Cmd.none )
    , view = \_ -> Html.div [] []
    , update =
        \msg ({ rateLimiter } as model) ->
            case msg of
                RLMsg msg_ ->
                    ( { rateLimiter = RateLimiter.update msg_ rateLimiter }, Cmd.none )

                ExpensiveOperation identifier ->
                    let
                        accept =
                            \rl -> ( { model | rateLimiter = rl }, Http.get { url = "https://example.com/", expect = Http.expectWhatever RequestCompleted } )
                    in
                    RateLimiter.trigger rateLimiter identifier accept ( model, Cmd.none )

                RequestCompleted _ ->
                    ( model, Cmd.none )
    , subscriptions = \{ rateLimiter } -> RateLimiter.sub rateLimiter |> Sub.map RLMsg
    }
```