# elm-time-travel

[![Build Status](https://travis-ci.org/jinjor/elm-time-travel.svg)](https://travis-ci.org/jinjor/elm-time-travel)

This is a fork of the excellent jinjor's elm-time-travel updated to work with elm 0.19.
An experimental debugger for Elm. See [DEMO](http://jinjor.github.io/elm-time-travel/)

## How to use

Just replace Browser.* with TimeTravel.*
So,
* Browser.sandbox become TimeTravel.sandbox
* Browser.element become TimeTravel.element
* Browser.document become TimeTravel.document
* Browser.application become TimeTravel.application

Also, because Debug.toString is no longer permitted in package, you need to 
pass it through a configuration object to TimeTravel.

Currently, this configuration object contains only 2 function, but may have 
other parameter in future.  See below for a sample of the configuration object.

We need to pass 3 parameters to all TimTravel functions, 
* a function to convert from Model to String (model --> String)
* a function to convert from Msg to String (msg -> String)
* a configuration record you can use the exposed defaultConfig and update it

It is possible to use Debug.toString as the function to convert model or msg to String
It is also possible to make your own but the result string should follow the same output as Debug.toString (json format)


```elm
import TimeTravel.Browser as TimeTravel exposing (defaultConfig)

main =
  -- Browser.element
  TimeTravel.element Debug.toString Debug.toString defaultConfig
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
```

Or, with a custom configuration:

```elm
import TimeTravel.Browser as TimeTravel exposing (defaultConfig, TimeTravelConfig)

config: TimeTravelConfig
config = {defaultConfig
  | startMinimized = True
  , startToLeft = False
  }

main =
  -- Browser.element
  TimeTravel.element Debug.toString Debug.toString config
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
```

That's it!

## What is this library for?

Elm has [a great official debugger](http://elm-lang.org/blog/the-perfect-bug-report) from 0.18, but this debugger was born at 0.17! These two are focusing on slightly different things. The official one focuses on reproducing state and communicating between dev and QA people. This one, on the other hand, is more focusing on digging into problems that happen in runtime.

This library implements following features:

* Filtering Msgs
* Filtering Model
* Figure out how Msgs are chaining

And the ideas not implemented yet are:

* Watch partial Model and find Msgs that changes it
* Automatically save debugger state

So this library is a PoC of what the official debugger can potentially be in the future. Evan is also positive at this :)


## LICENSE

BSD3
