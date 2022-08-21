# Unique Type

This module is basically a hack.
It exploits a bug in Elm's equality alogirthm to allow generation of unqiue values.
Use only with a hefty amount of caution.

## Install

```sh
elm install harrysarson/unique-type
```

## Usage

The following will display "False" in the browser.

```elm
module Main exposing (main)

import Html
import Unique


type alias User =
    { name : String
    , id : Unique.Unique
    }


createUser : String -> User
createUser name =
    { name = name
    , id = Unique.unique ()
    }

main =
    let
        user1 = createUser "Jim"
        user2 = createUser "Jim"
    in
    Html.text (Debug.toString <| user1 == user2)

```