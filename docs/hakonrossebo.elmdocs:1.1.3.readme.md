
# ElmDocs

The intention with this project is to provide offline docs to be used in Elm Repl. By importing this package into the REPL, you can search for all available Elm packages offline.

The project consist of an Elm package to be used in REPL and a F# project to download all latest packages to a cache. The package is generated with the latest packages frequently and hopefully on a daily basis soon.

[![Build Status](https://dev.azure.com/hakonrossebodev/ElmDocs/_apis/build/status/hakonrossebo.elmdocs)](https://dev.azure.com/hakonrossebodev/ElmDocs/_build/latest?definitionId=1)

## Usage

1. add the package to your project >elm install hakonrossebo/elmdocs
2. Start Elm repl >elm repl
3. run the help function to get suggestions on usage >help

## Available functions

* help
* getPackageInfo
* getPackageModuleValues
* search
* searchType
* getAllPackageModules

## Screenshot from REPL

![Image of REPL usage](https://raw.githubusercontent.com/hakonrossebo/elmdocs/master/ElmDocsScreenshot.png)

## Todo

* Automate creation of packages to ElmDocs package daily
* Refactoring and improvements
* Help, contributions and suggestions wanted, this is experimental on this stage. Functions and results can change.
