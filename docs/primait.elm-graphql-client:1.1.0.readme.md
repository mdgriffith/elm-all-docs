# GqlClient

> graphql client with automatic retry

This component is useful to force the retry implementation in graphql calls. 
It's particularly useful for handling cases of JWT authentication, but it could be used in cases where some 
request could fail and you want an automatic retry before giving up.

The refresh token in a JWT authentication context is a perfect use case. 
If you receive a "not authenticated" response from the server, you want to regenerate the jwt token 
with a stored refresh token.

In the context of an SPA with short lived tokens, you should have a centralized way to handle
the retry case.

## Use cases

#### case 1
```
gql call 
    -> everything is ok 
    -> update the model
```

#### case 2
```
gql call 
    -> domain error (not related to authentication) 
    -> update the model
```

#### case 3
```
gql call 
    -> auth error 
    -> do something to retry the call 
    -> retry the call 
    -> same as case #1 or #2
```

In the third case the user should not be aware of the fact the something is going on,
and this is the case where graphql_client could be useful


## Show me the code

In the [examples/gql_client](https://github.com/primait/elm-graphql-client/tree/master/examples/graphql_client)
you can find a full app (with docker and docker-compose) that shows how to correctly implement the component.

If you want to run it:

```
docker-compose run --service-ports graphql_client bash
# inside the container
xxxx> yarn start
# go to http://localhost:8000/
```


