# timed-cache

An elm module to help manage data that is fetched via tasks and is updated on a timer independent of the actions in your application. This can be useful for data that you have to fetch via API but don't have to update as ofen as the UI does. An example of this might be things like number of pending notifications.

An example of how to use this module:

```elm
module Main exposing (..)

import Browser exposing (Document)
import Task exposing (Task)
import TimedCache as TC

import Time
import Html exposing (div, text, code)
import Http

type alias Model =
  { uuid : TC.Model Http.Error String
  }

type Msg =
  CacheMsg (TC.Msg Http.Error String)

init : (Model, Cmd Msg)
init =
  let (cModel, cCmd) = TC.init readUUIDFromHttp 2000 ""
  in ( { uuid = cModel }, Cmd.map CacheMsg cCmd)

readUUIDFromHttp : Task Http.Error String
readUUIDFromHttp = Http.task
  { method = "GET"
  , headers = []
  , url = "https://httpbin.org/uuid"
  , body = Http.emptyBody
  , resolver = Http.stringResolver (\resp ->
      case resp of
        Http.GoodStatus_ _ s -> Ok s
        _ -> Err Http.NetworkError
      )
  , timeout = Nothing
  }

view : Model -> Document Msg
view model =
  { title = "timed-cache example"
  , body = [ div [] [text "This is an example of timed-cache. Below is the result of calling a http endpoint which returns a random uuid. The value of the uuid is available to be used at any time and will be re-fetched every 2 seconds."]
           , code [] [ text model.uuid.value ]
           ]
  }

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    CacheMsg cMsg ->
      let (cModel, cCmd) = TC.update model.uuid cMsg
      in ({model | uuid = cModel}, Cmd.map CacheMsg cCmd)

sub : Model -> Sub Msg
sub model = Sub.map CacheMsg <| TC.sub model.uuid

main : Program () Model Msg
main =
  Browser.document
    { init = (\_ -> init)
    , view = view
    , update = update
    , subscriptions = sub
    }
```
