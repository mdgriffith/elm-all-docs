# Elm compiler error exploration

Investigating an Elm compiler error: https://github.com/elm/compiler/issues/1796

The issue that I'm running into is that an package installed from package.elm-lang.org is throwing the error above.

Copying the package to disk and including the folder in `source-directories` of the elm.json file work perfectly fine.

This repo is meant to explore what is breaking. It will start with code that causes the issue and incrementally remove code until the root cause is hopefully identified.