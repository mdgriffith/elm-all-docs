# app-object

The `AppObject` is an object that encapsulates the `Model` and `Cmd Msg` of a component (returned in side effect functions like `init` or `update`) **plus** and `appData` object and a `Cmd appMsg`.
These new elements are a model and commands related to the entire application.

Let's say for instance that you have a component that does something (whatever) and that needs to open a modal, or set the connected user, or set the user language of the application, ...
All of these states/effects are related to the application, not to the component.
Indeed, the component itself can't open a modal because it's the application's responsibility.
Also, the component could save the connected user to its own state, but it's a data the entire application would like to know about and with the classic architecture of elm apps it's not
possible for a component to tell the app that it should update its state.

To make it simpler: a component can't change the state of its parent component and can't send commands with its parent's messages.

This is what `AppObject` is for, it allows you to:

* define a model that any component in the application can read and update
* send commands that the root component can handle

## Usage

### Definitions

You should start by defining what is your global state and what are your global messages.
Also, you could create an alias of `AppObject` which is resolved by your own `appData` and `appMsg`:

```elm
type alias MyAppObject model msg =
    AppObject.AppObject Data AppMsg model msg


type alias Data =
    { isModalOpen : Bool
    }


type AppMsg
    = ToggleModal Bool
```

### Your components

In your components each of your functions (`init`, `update`, `view`, `subscriptions`) should take your `appData` as parameter and your side effect functions (`init`, `update`)
must return an `AppObject`.

```elm
type Msg
    = OnClick Bool


type alias Model =
    ()


init : Data -> MyAppObject Model Msg
init data =
    AppObject.init data ()


update : Msg -> Data -> Model -> MyAppObject Model Msg
update msg data model =
    case msg of
        OnClick isModalOpen ->
            AppObject.init data model
                |> AppObject.batchAppCmd (Task.perform AppData.ToggleModal (Task.succeed (not isModalOpen)))
```

This way you can read the values in your `appData` model, everywhere in your application. For instance, you could know wether or not the modal is opened:

```elm
view : Data -> Model -> Html Msg
view data model =
    div []
        [ button [ onClick (OnClick (AppData.isModalOpen data)) ]
            [ if AppData.isModalOpen data then
                text "Close Modal"

              else
                text "Open Modal"
            ]
        ]
```

### Your root component

In your root component you should keep the `appData` in your state:

```elm
type alias Model =
    { component : Component.Model
    , data : Data
    }
```

You must also:
* update your state with your component's new model (this is not new)
* execute your component's commands (this is not new)
* update your state with the new `appData` returned by your component (**this is new**)
* execute the global commands sent by your component (**this is new**)

```elm
type Msg
    = ComponentMsg Component.Msg
    | AppMsgHandler AppMsg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ComponentMsg msg_ ->
            AppObject.init model.data model.component
                |> AppObject.andThen (Component.update msg_)
                |> AppObject.mapMsg ComponentMsg
                |> AppObject.mapModel (\component -> { model | component = component })
                |> AppObject.run mergeAppData AppMsgHandler

        AppMsgHandler (AppData.ToggleModal isModalOpen) ->
            AppObject.init (AppData.setModalOpen isModalOpen model.data) model
                |> AppObject.run mergeAppData AppMsgHandler


mergeAppData : Data -> Model -> Model
mergeAppData data model =
    { model | data = data }
```

## Examples

To run the examples go to the examples directory, install dependencies and run elm reactor:

```
> cd examples/
> elm reactor
```