# elm-ancillary-nonempty-list

![Build Status](https://github.com/langyu-app/elm-ancillary-nonempty-list/actions/workflows/test.yml/badge.svg)

* [elm-ancillary-nonempty-list](#elm-ancillary-nonempty-list)
  * [Introduction](#introduction)
  * [Installation](#installation)
  * [Contributing](#contributing)
  * [Changelog](#changelog)

## Introduction

This package provides additional convenience functions not found in
[mgold/elm-nonempty-list](https://package.elm-lang.org/packages/mgold/elm-nonempty-list/latest/)
for working with lists that are guaranteed (at compile time) to be non-empty.
As with all, `elm-ancillary-*` packages, these began as functions we've found
useful for `langyu` but often include additional functions.

## Installation

```bash
elm install langyu-app/elm-ancillary-nonempty-list
```

## Contributing

Contributions are welcome, so long as it has the potential to be generally
useful and isn't found already in `mgold/elm-nonempty-list`.

## Changelog

* `1.6.0`
  * ✨ Add uniqueness functions: `unique`, `uniqueBy`, `allDifferent`, and
    `allDifferentBy`.
* `1.5.0`
  * ✨ -- Add random `generator`
* `1.4.0`
  * ✨ -- Add indexed folds (`indexedFoldl` and `indexedFoldr`)
  * ✨ -- Add element finds (`elemIndex`, `elemIndices`, `findIndex`,
    `findIndices`, and `findMap`)
* `1.3.0`
  * ✨ -- Add `appendList` and `prependList`
  * 📄 -- Fix `elm.json` mistakenly listing GPL-3.0 license still
* `1.2.0`
  * ✨ -- Add `initialize`
* `1.1.0`
  * 📄 -- Release under BSD 3-Clause license
  * ✨ -- Add `count`, `find`, `foldr`, `foldr1`, and `sequenceGenerators`
  * 📝 -- Add doc examples (checked with
    [elm-verify-examples](https://github.com/stoeffel/elm-verify-examples))
* `1.0.0` -- Initial release

---

[![the langyu logo, a multi-colored tangram depicting a wolf](https://raw.githubusercontent.com/langyu-app/organization/master/Logos/main.svg)](https://www.github.com/langyu-app)
