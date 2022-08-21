# elm-ghost

This is basically a port of the ghost-blog API to elm. See the documentation at
https://docs.ghost.org/api/content for all details.

## Usage

There are only two modules that need to be included `Ghost` and `Ghost.Params`.
The first contains all functions and types that are required to talk to your
ghost blog, while the later is used to defined any kind of configuration.

``` elm
import Ghost
import Ghost.Params
```

The library generates HTTP request, so that message types will have to be
defined accordingly. All requests result either in an `Ghost.Error` as a
combined type of `HttpError` and `GhostError` or in a tuple, that contains
a list of the returned results and pagination information.

``` elm
type Msg
    = ...
    | GotPost (Result Ghost.Error ( List Ghost.Post, Ghost.Meta ))
    | ...
```

Use `Ghost.config` to store the basic settings appropriately, at the moment, the
last parameter always has to be `"v2"`.

``` elm
... config = Ghost.config "https://..." "2951c7676d21b............." "v2"
```

Do the following to receive your data or error messages.

``` elm
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Load ->
            ( model
            , Ghost.Params.empty
                |> Ghost.Params.limit 1
                |> Ghost.Params.fields "id,title,html"
                |> Ghost.posts model.config GotText
            )

        GotPost (Ok ( list, _ )) ->
            ( { model | state = Success, rslt = Just list }
            , Cmd.none
            )

        GotPost (Err info) ->
            ( { model | state = Failure <| Ghost.errorToString info }
            , Cmd.none
            )

        ...
```
