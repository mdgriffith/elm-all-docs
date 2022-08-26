# elm-aws

Helper functions to create signed http requests to AWS, e.g. DynamoDB or IAM

This package does not export any `Task` function, removing the ability to inject backdoors. It can only sign `UnsignedRequest` and return the necessary argument for `Http.task`.

So, at most, you'd need only to verify the host of `url` in the returned `SignedRequest` record

``` elm
-- Setup the request


stringBody =
    Json.Encode.object
        [ ( "TableName", Json.Encode.string "Example" )
        , ( "Key"
          , Json.Encode.object
                [ ( "primaryKey", AWS.DynamoDB.encodeS "uniqueValue" )
                ]
          )
        ]
        |> Json.Encode.encode 0

rawRequest =
    { method = "POST"
    , headers =
        [ AWS.awsTargetHeader AWS.DynamoDB_GetItem
        ]
    , query = []
    , stringBody = stringBody
    , resolver = httpResolver
    , service = AWS.ServiceDynamoDB
    }


-- If AWS.signRequest is successful, give it to Http.task


httpTask =
    case AWS.signRequest config now rawRequest of
        Err err ->
            -- unable to create request

        Ok signedRequest ->
            Http.task signedRequest
```
