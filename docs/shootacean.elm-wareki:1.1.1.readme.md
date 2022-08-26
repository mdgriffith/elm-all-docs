# elm-wareki
A convert date to wareki for elm program.

## Usage

```elm
> import Wareki
> import Time

> Wareki.toNengoFromPosix <| Time.millisToPosix 1599909981000
Ok "令和" : Result String String

> Wareki.toWarekiFromIsoString "2020-09-03" ]
"令和2年9月3日" : String
```

## Reference
- https://korban.net/posts/elm/2018-10-02-basic-steps-publish-package-elm-19/
- https://www.benricho.org/nenrei/sei-wa-conv.html 
