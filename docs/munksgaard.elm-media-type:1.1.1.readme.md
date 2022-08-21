# elm-media-type

`elm-media-type` lets you parse and handle [media
types](https://en.wikipedia.org/w/index.php?title=Media_type) like `text/html;
charset=UTF-8` and `application/javascript` in Elm.

Here is an example of how it works:

```elm
MediaType.fromString "application/javascript"
  == Just
      { parameters = Dict.fromList []
      , registrationTree = Nothing
      , subtype = "javascript"
      , suffix = Nothing
      , type_ = Application
      }
```
