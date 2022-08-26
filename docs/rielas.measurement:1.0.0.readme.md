# Measurement Protocol

This package helps you to work with Google Analytics [`Measurement protocol`](https://developers.google.com/analytics/devguides/collection/protocol/v1).

## Sending Required Values 

### POST request

Let's send `page view` event to the Google Analytics:

```elm
import Measurement as GA
import Parameter
import Http

GA.post
    { hitType = HitType.Pageview
    , trackingId = "UA-123456-1"
    , clientId = "555"
    , payload = [ Parameter.DocumentPath "/pageA" ]
    }
    |> Http.post
```

This will construct Measurement Protocol hit and send it to the `POST /collect`
endpoint. You can check your request with [Hit Builder](https://ga-dev-tools.appspot.com/hit-builder/).

### GET request

For environments where you can not send POST data, you can also send HTTP GET requests.

```elm
import Measurement as GA
import Parameter
import Http

GA.get
    { hitType = HitType.Event
    , trackingId = "UA-XXXXX-Y"
    , clientId = "555"
    , payload =
        [ Parameter.CacheBuster "289372387623"
        , Parameter.EventCategory "video"
        , Parameter.EventAction "play"
        , Parameter.EventLabel "holiday"
        , Parameter.EventValue 300
        ]
    }
    |> Http.get
```

### Batch requests

To send multiple hits in a single request, use batch mode.

```elm
import Measurement as GA
import Parameter
import Http

GA.batch
    [ { hitType = HitType.Event
      , trackingId = "UA-XXXXX-Y"
      , clientId = "555"
      , payload =
            [ Parameter.CacheBuster "289372387623"
            , Parameter.EventCategory "video"
            , Parameter.EventAction "play"
            , Parameter.EventLabel "holiday"
            , Parameter.EventValue 300
            ]
      }
    , { hitType = HitType.Pageview
      , trackingId = "UA-123456-1"
      , clientId = "5555"
      , payload = [ Parameter.DocumentPath "/pageA" ]
      }
    ]
    |> Http.post
```
