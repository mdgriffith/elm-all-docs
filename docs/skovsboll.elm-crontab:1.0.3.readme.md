elm-crontab
===

### A crontab parser and humanizer in Elm -- for the basic UNIX syntax.

Inspired by [rodinalex/elm-cron](https://github.com/rodinalex/elm-cron) but rewritten from scratch using [elm/parser](https://github.com/elm/parser) and elm 0.19.1

## Installation

`elm install skovsboll/elm-cron`

Run the examples using `elm repl` :

## Parsing

```elm
import Cron exposing (fromString)

Cron.fromString " *   * *   *  *  "
-- (Ok (Cron Every Every Every Every Every))

Cron.fromString "* * */3 4 *"
-- Ok (Cron Every Every (Single (EveryStep 3)) (Single (Simple (Particle April))) Every)

```


## Explaining

```elm
import Cron exposing (Atom(..), Cron(..), Expr(..), Term(..), Month(..))
import Humanizer

Humanizer.toString (Cron Every Every (Single (EveryStep 3)) (Single (Simple (Particle April))) Every)
-- "every minute, every hour, every third day of the month, in April, all week."

```


## All together now

```elm
import Cron exposing (fromString)
import Humanizer
import Parser

case Cron.fromString "30 10 * * 3" of
    Ok cron ->
        Humanizer.toString cron
    Err deadEnds ->
        let
            _ = Debug.log "deadEnds" deadEnds
        in
            "error"
            

-- at 10:30, every day of the month, all year, on Wednesday.

```

## Detecting syntax errors

```elm

Cron.fromString "1,2 * 30,31,32 * xyz"
--Err
--    [ { col = 15
--      , problem = Problem "Expected an integer from 1 through 31."
--      , row = 1
--      }
--    ]

Cron.fromString "* * * * xyz"
--Err 
--    [ { col = 12
--      , problem = Problem ("Expected the name of a week day (sun, mon, tue etc...) or a number from 0 through 6.")
--      , row = 1 }
--    , { col = 9
--      , problem = ExpectingSymbol "*"
--      , row = 1 }
--    ]

```


## Where to go from here?

See the [tests](https://github.com/skovsboll/elm-crontab/tree/main/tests)


## Caveats

Only five segments supported.
No fancy syntax supported.



## Licence 

[BSD 0-Clause License (0BSD)](https://tldrlegal.com/license/bsd-0-clause-license)

TLDR; Do what you want with it, but don't hold me liable for damages.


## Contributing

Open issue
Fork
Fix
Submit PR
