# elm-graphql-debug-errors

This package is intended to provide developer-friendly error messages from dillonkearns' graphql package, in English.

## Install

```
elm install eeue56/elm-graphql-debug-errors
```

## Usage

Use this in your code where you'd handle the errors from GraphQL. It's intended for use by developers - not end users, but it might give you more to go on than you would otherwise have.

```
handleGraphql : String -> Cmd Msg -> Result (Graphql.Http.Error a) a -> Msg
handleGraphql name command result =
    case result of
        Ok _ ->
            GotResponse (Ok <| "Succeeded " ++ name) command

        Err e ->
            GotResponse
                (Err <| "Failed to run " ++ name ++ " due to " ++ graphqlErrorToString e)
                command
```