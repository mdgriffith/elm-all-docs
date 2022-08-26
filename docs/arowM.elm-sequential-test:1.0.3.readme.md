# elm-sequential-test

[![Build Status](https://app.travis-ci.com/arowM/elm-sequential-test.svg?branch=main)](https://app.travis-ci.com/arowM/elm-sequential-test)  
[Document](https://package.elm-lang.org/packages/arowM/elm-sequential-test/latest/)  

# A Quick Example

```elm
suite : Test
suite =
    Sequence.describe "Sample URL"
        |> Sequence.map (\_ -> "https://example.com/user/3")
        |> Sequence.andThen "should be valid URL"
            (\str ->
                Url.fromString str
            )
        |> Sequence.assert "should be parsed correctly"
            (\url ->
                Url.Parser.parse urlParser url
                    |> Expect.equal
                        (RouteUser 3)
            )
        |> Sequence.run
```
