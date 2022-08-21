**NOT READY YET**

# PostgRestAdmin

This package is meant as a turn key back office interface to a
[PostgREST](https://postgrest.org/en/stable/) instance with optional
configuration, inspired by Rails' [ActiveAdmin](https://activeadmin.info/).


## PostgREST

[PostgREST](https://postgrest.org/en/stable/) is a web server that sits in front
of a Postgres database providing a simple but powerful RESTful API.

It delegates a lot of the functionality to the database, performing
authentication using [roles](https://www.postgresql.org/docs/8.1/user-manag.html)
and exposing only certain tables to the REST API using
[schemas](https://www.postgresql.org/docs/current/ddl-schemas.html).

A Postgrest database can have many different schemas (not to be confused with
the database schema).  
A schema can be thought of a namespace that contains
tables, types and functions, a db connection can specifiy a
[search path](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PATH)
which indicates which schemas, and with what precendence, to use to find the db
tables.
To understand better how does PostgREST restricts the API table exposure check
[schema isolation](https://postgrest.org/en/stable/schema_structure.html?highlight=schema),
[switching schemas](https://postgrest.org/en/stable/api.html#switching-schemas)
and [configuration](https://postgrest.org/en/stable/configuration.html).

PostgREST depends on [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token)
for authentication, which can be obtained from an external provider with a
shared
[secret](https://postgrest.org/en/stable/configuration.html?highlight=secret#jwt-secret),
or by defining a
[couple of PL/pgSQL procudeures](https://postgrest.org/en/stable/api.html#stored-procedures)
it can provide a login
[RPC](https://postgrest.org/en/stable/releases/v9.0.0.html?highlight=rpc#functions-rpc)
and generate it's own tokens.

Fine grained
[permissions](https://postgrest.org/en/stable/auth.html?highlight=permissions#permissions)
can be given by
[granting](https://www.postgresql.org/docs/current/sql-grant.html) different
privileges to roles on a schema, table and row level.

To learn more about PostgREST role based auth check
[Role System](https://postgrest.org/en/stable/auth.html?highlight=authentication#).

PostgREST also generates an
[OpenAPI](https://postgrest.org/en/stable/api.html#openapi-support) description
of the api, which contains information about all of the endpoints (tables,
foreign tables, views, functions), it can be used to generate swagger.  
**PostgRestAdmin uses this description to infer the admin interface to the API
resources**.

## Usage

### **Basic**

The most basic way use is just to define your main function as a
[PostgRestAdmin.Program](PostgRestAdmin#Program), the admin interface is built
from PostgREST Open API description.

    module Main exposing (main)

    import PostgRestAdmin
    import PostgRestAdmin.Config as Config


    main : PostgRestAdmin.Program Never Never
    main =
        PostgRestAdmin.application Config.init


Then flags can be passed on `Elm.init`

    Elm.Main.init({
        flags: {
           host: "https://postgrest.example.com",
           jwt: sessionStorage.getItem("jwt")
        }
    })

`jwt` flag accepts a token to authenticate the requests.


### **In Elm configuration**

[Configuration](PostgRestAdmin-Config) params are passed to the
PostgRestAdmin program in the example bellow.

- [withHost](PostgRestAdmin-Config#withHost) sets the PostgREST instance host,
- [withFormAuth](PostgRestAdmin-Config#withFormAuth) enables form
  authentication, and takes a
- [FormAuth](PostgRestAdmin-Config-FormAuth) configuration
- optionally [FormAuth](PostgRestAdmin-Config-FormAuth) can be
configured with
- [withAuthUrl](PostgRestAdmin-Config-FormAuth#withAuthUrl) which specifies a
  url to POST credentials, wich can be a postgREST function or an external
  service if CORS is configured correctly.



    port module Main exposing (main)

    import PostgRestAdmin
    import PostgRestAdmin.Config as Config
    import PostgRestAdmin.Config.FormAuth as FormAuth


    port loginSuccess : String -> Cmd msg


    main : PostgRestAdmin.Program Never Never
    main =
        Config.init
            |> Config.withHost "https://postgrest.example.com"
            |> Config.withFormAuth
                (FormAuth.config
                    |> FormAuth.withAuthUrl
                        "https://postgrest.example.com/rpc/login"
                )
            |> Config.withOnLogin loginSuccess
            |> PostgRestAdmin.application


In addition to configuring the login POST url `withFormAuth` and `withAuthUrl`,
the token is persisted to keep the user loggedin across page reloads, by using
flags and ports.

    app = Elm.Main.init({
      flags: {
        jwt: sessionStorage.getItem("jwt")
      }
    })

    app.ports.loginSuccess.subscribe(jwt => {
      sessionStorage.setItem("jwt", jwt)
    });

Most of the previous configuration options can be overriden using flags, thus
the same build can be used in different environments. See
[Config](PostgRestAdmin-Config).

### **Mounting your own app**

You can override some listing, the detail for a resource, a form or add
additional behaviour by *mounting your own application* in as many routes as you
want.

See [Config.withMountPoint](PostgRestAdmin-Config#withMountPoint).