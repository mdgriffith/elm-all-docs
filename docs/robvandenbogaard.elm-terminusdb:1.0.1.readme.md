# elm-terminusdb

A library for accessing TerminusDB databases from Elm.

In its current state this package has a lot to wish for regarding documentation
and completeness. It is functional for querying though. I hope to improve things
soon. In the mean time, the Bike example should do a good job covering how
things work.

## API Implementation status

- [X] connect
- [X] createDatabase
- [ ] deleteDatabase
- [ ] deleteDatabaseForced
- [X] query
- [X] addUser
- [ ] getTriples (done excluding Turtle format parsing)
- [ ] replaceTriples (done excluding Turtle format encoding)
- [ ] updateTriples (done excluding Turtle format encoding)
- [ ] pull
- [ ] push
- [ ] createGraph
- [ ] deleteGraph
- [ ] fetch
- [ ] rebase

## Usage

See the Bike example (in the examples directory) using the setup from
https://blog.terminusdb.com/2020/09/01/my-first-terminusdb-3-0-graph-bike-share-data

``` elm
import Json.Decode as Decode
import TerminusDb.Api.Connect as Connect
import TerminusDb.Api.Query as Query
import TerminusDb.Schema.Prefix exposing (Prefix(..))
import TerminusDb.Schema.Xsd.Decode as XsdDecode
import TerminusDb.Session exposing (Session)
import TerminusDb.Woql as Woql exposing (Query(..), Value(..))
```

Wire up a model to at least hold an api session:

``` elm
type Model
    = Connected Session
```

Include a message to catch the connect response:

``` elm
type Msg
    = GotSession (Result Woql.Error Session)
```

Return the connect command from your init or update function:

``` elm
Connect.request GotConnected
    |> Connect.toDatabase "bikes"
    |> Connect.asUser "admin"
    |> Connect.withPassword "root"
    |> Connect.command
```

Use WOQL to construct queries:

``` elm
query =
    Limit 20 <|
        Select [ "StartTime", "Bike", "Start", "End" ]
            (And
                [ Triple (Var "JourneyRef") (Node Rdf "type") (Node Scm "Journey")
                , Triple (Var "JourneyRef") (Node Scm "start_time") (Var "StartTime")
                , Triple (Var "JourneyRef") (Node Scm "start_station") (Var "StartRef")
                , Triple (Var "StartRef") (Node Rdfs "label") (Var "Start")
                , Triple (Var "JourneyRef") (Node Scm "end_station") (Var "EndRef")
                , Triple (Var "EndRef") (Node Rdfs "label") (Var "End")
                , Triple (Var "JourneyRef") (Node Scm "journey_bicycle") (Var "BikeRef")
                , Triple (Var "BikeRef") (Node Rdfs "label") (Var "Bike")
                ]
            )
```

Setup a decoder (with schema prefix context) for parsing the query result:
``` elm
decoder context =
    Decode.list <|
        Decode.map4
            Journey
            (Decode.field "StartTime" <| XsdDecode.dateTime context)
            (Decode.field "Bike" <| XsdDecode.string context)
            (Decode.field "Start" <| XsdDecode.string context)
            (Decode.field "End" <| XsdDecode.string context)
```

Have a message for receiving the typed query result:
``` elm
type Msg
    = ...
    | GotList (Result Woql.Error (List Journey))

type alias Journey =
    { time : String
    , bike : String
    , start : String
    , end : String
    }
```

Use query commands to get data from TerminusDB:
``` elm
Query.command session (Query.request GotList decoder query)
```

Use queryCommit commands to post data to TerminusDB with a commit message.
