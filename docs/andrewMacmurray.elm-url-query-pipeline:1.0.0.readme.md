# Elm Url Query Pipeline

[![CI](https://github.com/andrewMacmurray/elm-url-query-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/andrewMacmurray/elm-url-query-pipeline/actions/workflows/ci.yml)

### Parse Url Queries Pipeline Style

```shell
elm install andrewMacmurray/elm-url-query-pipeline
```

## What?

Some helpers to combine [elm/url](https://package.elm-lang.org/packages/elm/url/latest/Url-Parser-Query) Url Query param
parsers using a pipeline style -
think [elm-json-decode-pipeline](https://package.elm-lang.org/packages/NoRedInk/elm-json-decode-pipeline/latest/) but
for Url Query params:

```elm
import Url.Parser.Query as Query -- from elm/url
import Url.Query.Pipeline as Pipeline


type alias AuthCallback =
    { userId : Int
    , userName : Maybe String
    , idToken : String
    , idTokenExpiresAt : Int
    , refreshToken : String
    }


authCallbackQuery : Query.Parser (Maybe AuthCallback)
authCallbackQuery =
    Pipeline.succeed AuthCallback
        |> Pipeline.required (Query.int "user_id")
        |> Pipeline.optional (Query.string "user_name")
        |> Pipeline.required (Query.string "id_token")
        |> Pipeline.required (Query.int "id_token_expires_at")
        |> Pipeline.required (Query.string "refresh_token")
        


```

Examples where: `parseCallbackUrl : String -> Maybe AuthCallback`

```elm
parseCallbackUrl "/?user_id=1&id_token=abc&id_token_expires_at=123&refresh_token=bca"
    == Just
          { userId = 1
          , userName = Nothing
          , idToken = "abc" 
          , idTokenExpiresAt = 123
          , refreshToken = "bca"
          }

parseCallbackUrl "/?id_token=abc&refresh_token=bca"          
    == Nothing
```

## Why?

Parsing many url query params can get messy, particularly if you have a mixture of optional and required values where
the data you need doesn't make sense without them:

e.g. the same query from above without pipelines:

```elm
type alias AuthCallback =
    { userId : Int
    , userName : Maybe String
    , idToken : String
    , idTokenExpiresAt : Int
    , refreshToken : String
    }


authCallbackQueryOld : Query.Parser (Maybe AuthCallback)
authCallbackQueryOld =
    Query.map5
        (\maybeUserId userName maybeIdToken maybeIdTokenExpiresAt maybeRefreshToken ->
            Maybe.map4
                (\userId idToken idTokenExpiresAt refreshToken ->
                    { userId = userId
                    , userName = userName
                    , idToken = idToken
                    , idTokenExpiresAt = idTokenExpiresAt
                    , refreshToken = refreshToken
                    }
                )
                maybeUserId
                maybeIdToken
                maybeIdTokenExpiresAt
                maybeRefreshToken
        )
        (Query.int "user_id")
        (Query.string "user_name")
        (Query.string "id_token")
        (Query.int "id_token_expires_at")
        (Query.string "refresh_token")
        
```

## How?

install package and `elm/url` using

```shell
elm install elm/url
```

```shell
elm install andrewMacmurray/elm-url-query-pipeline
```

Use with your regular `elm/url` parsers

```elm
import Url exposing (Url)
import Url.Parser as Parser exposing ((<?>), s, top)
import Url.Parser.Query as Query
import Url.Query.Pipeline as Pipeline


type Route
    = Home (Maybe MyQuery)
    | AnotherRoute


type alias MyQuery =
    { one : String
    , two : Maybe String
    , three : List Int
    }


query : Query.Parser (Maybe MyQuery)
query =
    Pipeline.succeed MyQuery
        |> Pipeline.required (Query.string "one")
        |> Pipeline.optional (Query.string "two")
        |> Pipeline.with (Query.custom "three" (List.filterMap String.toInt))


routes : Parser.Parser (Route -> a) a
routes =
    Parser.oneOf
        [ Parser.map Home (top <?> query)
        , Parser.map AnotherRoute (s "another-route")
        ]


fromString : String -> Maybe Route
fromString =
    Url.fromString >> Maybe.andThen (Parser.parse routes)
    
```

Some examples from above:

```elm
fromString "http://example/another-route" == Just AnotherRoute

fromString "http://example?one=hello&two=world&three=1&three=2"
    == Just
        (Home
            (Just
                { one = "hello"
                , two = Just "world"
                , three = [ 1, 2 ]
                }
            )
        )
```

## Develop Locally

install dependencies

```shell
npm install
```

run the tests

```shell
npm test
```

preview the docs

```shell
npm run docs
```
