# Time Format Package

### Introduction

An Elm language package for formatting dates and times with support for internationalization.

See bottom of this document for important history notes.

### Code format

This project uses elm-format for formatting its Elm code.

### Includes
* flexible formatting of dates into strings
  * simple i18n support for long and short Day and Month names.
  * see [DocFormat.md](https://github.com/CoderDennis/elm-time-format/blob/master/DocFormat.md)


### Example

see [ExampleConfigFormat.elm](https://github.com/CoderDennis/elm-time-format/blob/master/examples/ExampleConfigFormat.elm)

### Where did this come from.

This was created based upon code extracted from one of Robin's projects and also from Luke's https://github.com/lukewestby/elm-date-extra/ and put into  https://github.com/rluiten/elm-date-extra.

The date time format code originally came from
https://github.com/mgold/elm-date-format/ however I have modified it and hence any problems you discover with it in this package should be initially raised with me.


## Feedback

It is hoped that with feedback from users and reviewers with deep Type-zen it will be possible to improve the API to reduce the chances of doing the wrong thing with out realising it.

#### Feedback that is of interest.

* Additional locale for the Configs section.
* More Examples for example folder
* Improved documentation.
* Bugs.
  * Please try to include sufficient detail to reproduce.
  * Better yet create a test and submit a pull request, even if you cant figure out how to fix it.
* More tests.
  * That demonstrate issues.
  * That fill a short fall in existing tests..



## Useful references

Many ideas and concepts shamelessly borrowed from the following.

* http://momentjs.com/docs/
* http://nodatime.org/1.3.x/userguide/
* https://www.npmjs.com/package/timezonecomplete

## Testing

This uses elm-test for testing so install it if you don't have it.

* npm install -g elm-test

To run Tests

* elm-test

### History

Only major (and recent) changes are listed here.

* 2019/04/24 1.0.0
  * forked from https://github.com/rluiten/elm-date-extra which was only compatible with Elm 0.18
  * Removed everything except i18n Configs and Format
  * There are better ways to work with iso date strings and performing Time math in Elm 0.19


Copyright (c) 2016-2018 Robin Luiten

Copyright (c) 2019 Dennis Palmer
