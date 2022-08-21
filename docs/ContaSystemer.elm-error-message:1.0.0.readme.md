# ErrorMessage

The package contains module with helper functions for specific error messages.

It's very usefull when doing a communication with JS via ports.

Let's say we receive a `Json.Encode.Value` from JS.
It's a user data with following data structure:

```elm
module User exposing (User, decoder)

import Json.Decode as Decode


type alias User =
    { id : Int
    , name : String
    }


decoder : Decode.Decoder User
decoder =
    Decode.map2 User (Decode.field "id" Decode.int) (Decode.field "name" Decode.string)
```

We would like to decode it.
But decoding may fail.
When decoding fails we would like to log specific error somewhere (e.g to Sentry).


```elm
import ErrorMessage
import Json.Decode as Decode
import User


type Msg
    = UserReceived User.User
    | ReportError String


decodeUser : Decode.Value -> Msg
decodeUser jsonValue =
    case Decode.decodeValue User.decoder jsonValue of
        Ok user ->
            UserReceived user

        Err error ->
            ReportError (ErrorMessage.typeMismatch (Decode.errorToString error))
```
