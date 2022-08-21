# elm-datetime

ELM datetime component.


## Example

```elm

type alias Model =
  { model : Datetime.Model
  }

type Msg
  = OnMsg Datetime.Model


init : Model
init =
  { model = Datetime.init "2006-01-02T15:04:05.999999999Z07:00"
  }


view : Model -> Html Msg
view model =
  Datetime.view OnMsg model.model


update : Msg -> Model -> Model
update msg model =
  case msg of
    OnMsg s ->
      { model | model = s }
```


## Development

Execute the example:

```
> cd examples
> npm run dev
```

open `http://0.0.0.0:3000`.


## License

This project is licensed under [Mozilla Public License Version 2.0](./LICENSE).
