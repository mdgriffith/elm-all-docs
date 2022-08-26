# remote-resource [![Build Status](https://travis-ci.org/FabienHenon/remote-resource.svg?branch=master)](https://travis-ci.org/FabienHenon/remote-resource)

Remote Resource alllows you to handle foreground and background resources, using [RemoteData](https://package.elm-lang.org/packages/krisajenkins/remotedata/latest/).

For instance, let's say you want to retrieve a list of posts. You are using the RemoteData package, thus you can handle the state of your request (Loading, Success, etc...).
You will probably display a loading icon while your request is in progress, and once it has been fully retrieved you will display your posts.
But now, let's say you know your posts have changed and you would like to update them. You will probably want to send another request to your webservice with the same Elm RemoteData you
used when you first retrieved your posts. That means your users will see your posts disapear for a few milliseconds (depending on the latency and network speed),
replaced by a loading icon, to be finally updated and displayed again to your users.

Now, with `RemoteResource` you can refresh your posts in the background. Than means that you keep displaying your "old" posts to your users,
and when the new data has been retrieved you can replace your old posts by the new ones without your users seeing some loading icon!

## Getting started

Here is an example where you want to retrieve posts.
When you receive a refresh event you retrieve the new posts while still showing the old posts to the users.
In your view you will display a button when the new posts have been retrieved to let the user replace the old posts by the new ones:

```elm
type Msg
    = Refresh
    | OnDataRetrieved (RemoteData Http.Error (List Post))
    | UpdateData

type alias Model =
    { posts : RemoteResource Http.Error (List Post) }


init : (Model, Cmd Msg)
init =
    ( { posts = RemoteResource.init |> RemoteResource.loading }
    , retrievePosts OnDataRetrieved 
    )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Refresh ->
            ( { model | posts = model.posts |> RemoteData.reloading }
            , retrievePosts OnDataRetrieved
            )

        OnDataRetrived data ->
            ( { model | posts = model.posts |> RemoteData.setBackground data }
            , Cmd.none
            )

        UpdateData ->
            ( { model | posts = model.posts |> RemoteData.replaceResourceByBackground }
            , Cmd.none
            )

view : Model -> Html Msg
view { posts } =
    div []
        [ if RemoteResource.hasNewResource comparePosts posts then
            button [ onClick UpdateData ] [ text "Show my new posts" ]
          else
            text ""
        , case posts of
            NotAsked ->
                loadingIcon

            Loading ->
                loadingIcon

            Failure err ->
                text "Failed"

            Success data ->
                div []
                    (List.map viewPost data)
        ]

subscriptions : Sub Msg
subscriptions =
    onRefresh Refresh
```

In the example below you will display the number of connected users.
When you receive a refresh event you retrieve the new count of connected users and you replace the old count by the new count without showing the loading icon:

```elm
type Msg
    = Refresh
    | OnDataRetrieved (RemoteData Http.Error Int)

type alias Model =
    { count : RemoteResource Http.Error Int }


init : (Model, Cmd Msg)
init =
    ( { count = RemoteResource.init |> RemoteResource.loading }
    , retrieveConnectedUsersCount OnDataRetrieved 
    )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Refresh ->
            ( { model | count = model.count |> RemoteData.reloading }
            , retrieveConnectedUsersCount OnDataRetrieved
            )

        OnDataRetrived data ->
            ( { model | count = model.count |> RemoteData.setResource data }
            , Cmd.none
            )

view : Model -> Html Msg
view { count } =
    div []
        [ case count of
            NotAsked ->
                loadingIcon

            Loading ->
                loadingIcon

            Failure err ->
                text "Failed"

            Success data ->
                div [] [ text ("Connected users: " ++ (String.fromInt data)) ]
        ]

subscriptions : Sub Msg
subscriptions =
    onRefresh Refresh
```
