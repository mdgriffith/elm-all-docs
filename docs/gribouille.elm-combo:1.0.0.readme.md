# elm-combo

ELM combobox component.


## Example

```elm
type alias Model =
  { state : Combo.State
  }

type Msg
  = OnState Combo.State


data : List String
data =
  [ ... ]


view : Model -> Html Msg
view model =
  Combo.view (Combo.config OnState data) model.state


update : Msg -> Model -> Model
update msg model =
  case msg of
    OnState s ->
       { model | state = s }

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
