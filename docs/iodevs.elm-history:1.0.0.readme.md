# elm-history
This library helps with keeping history of states of your variables.
For example, you defined a width of some div (elm-css or style or ...) and
this width has been changed by user's action. After that you want to have
same width of div as before user's action.

Install package usually a way (elm-0.19):
```
elm install iodevs/elm-history
```


## Usage:
```haskell
import History exposing (History, create, forward, rewind, rewindAll)

boxWidth : History String
boxWidth =
    create "200px"


newBoxWidth =
    boxWidth
        |> forward "300px"  -- History "300px" ["200px"]
        |> forward "400px"  -- History "400px" ["300px", "200px"]
        |> forward "500px"  -- History "500px" ["400px", "300px", "200px"]
        |> rewind           -- History "400px" ["300px","200px"]
        |> rewindAll        -- History "200px" []
        |> current          -- "200px"
```


