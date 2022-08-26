# GraphQL in Elm

This package helps you build GraphQL together with Decoders
and then build a HTTP request with nice chainable interface
(adoptation of [lukewestby/elm-http-builder][elm-http-builder]).

## Example

Let's imagine that you want to request some information about current user:

```elm
module Api exposing (User, me, renameMe)

import GraphQL
import GraphQL.Argument as Argument
import GraphQL.Selector as Selector exposing (Selector)


type Msg
    = ReceiveUserDone (Result Selector.Error User)
    | RenameUserDone (Result Selector.Error User)


type alias User =
    { id : String
    , name : String
    , email : String
    , age : Int
    , rating : Float
    }


userSelector : Selector User
userSelector =
    Selector.map5 User
        (Selector.field "id" [] Selector.string)
        (Selector.field "name" [] Selector.string)
        (Selector.field "email" [] Selector.string)
        (Selector.field "age" [] Selector.int)
        (Selector.field "rating" [] Selector.float)


me : String -> GraphQL.Request User
me token =
    Selector.field "me" [] userSelector
        |> GraphQL.query "GetMe"
        |> GraphQL.post "https://my-awesome-graphql-server.com"
        |> GraphQL.withBearerToken token



-- if you send `me` query like this


meCmd : Cmd Msg
meCmd =
    Selector.send ReceiveUserDone (me "token")



-- it builds `Decoder` which equal to:


meDecoder : Json.Decode.Decoder User
meDecoder =
    -- a user decoder
    Json.Decode.map5 User
        (Json.Decode.field "id" Json.Decode.string)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "email" Json.Decode.string)
        (Json.Decode.field "age" Json.Decode.int)
        (Json.Decode.field "rating" Json.Decode.float)
        -- field of query
        |> Json.Decode.field "me"
        -- configurable container of GraphQL server response
        |> Json.Decode.field "data"



-- and GraphQL:


meGraphQL : String
meGraphQL =
    """
    query RenameMe {
        me {
            id
            name
            email
            age
            rating
        }
    }
    """


renameMe : String -> String -> GraphQL.Request User
renameMe token nextName =
    Selector.field "updateMe"
        [ ( "name", Argument.string name )
        ]
        userSelector
        |> GraphQL.mutation "RenameMe"
        |> GraphQL.post "https://my-awesome-graphql-server.com"
        |> GraphQL.withBearerToken token



-- and if you send `renameMe` mutation like this


renameMeCmd : Cmd Msg
renameMeCmd =
    Selector.send RenameUserDone (renameMe "token" "Newname")



-- it builds `Decoder` which equal to:


renameMeDecoder : Json.Decode.Decoder User
renameMeDecoder =
    -- a user decoder
    Json.Decode.map5 User
        (Json.Decode.field "id" Json.Decode.string)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "email" Json.Decode.string)
        (Json.Decode.field "age" Json.Decode.int)
        (Json.Decode.field "rating" Json.Decode.float)
        -- field of query
        |> Json.Decode.field "updateMe"
        -- configurable container of GraphQL server response
        |> Json.Decode.field "data"



-- and GraphQL:


renameMeGraphQL : String
renameMeGraphQL =
    """
    mutation RenameMe {
        updateMe(name: "Newname") {
            id
            name
            email
            age
            rating
        }
    }
    """
```

So you need no more to configure `Decoder`s and build GraphQL separately each other!
You can do all stuff exactly like with `Decoder`: combine, nest and reuse described `Selector`s.



[elm-http-builder]: https://github.com/lukewestby/elm-http-builder
