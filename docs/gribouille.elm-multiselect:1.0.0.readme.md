# elm-multiselect

ELM multiselect component.


## Example

```elm
type alias Model =
  { state : MultiSelect.State
  }

type Msg
  = OnState MultiSelect.State


data : List String
data =
  [ ... ]


init : Model
init =
  { state = MultiSelect.init []
  }


view : Model -> Html Msg
view model =
  ...
  div [] [ text <| "Values: " ++ String.join ", " (MultiSelect.values model.state)
  ...
  MultiSelect.view (MultiSelect.config "myid" OnState data) model.state
  ...


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
