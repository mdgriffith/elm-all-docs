# Bubblegum-entity

![Status of direct
dependencies](https://reiner-dolp.github.io/elm-badges/flarebyte/bubblegum-entity/dependencies.svg)
![License of the
package](https://reiner-dolp.github.io/elm-badges/flarebyte/bubblegum-entity/license.svg)
![Latest version of the
package](https://reiner-dolp.github.io/elm-badges/flarebyte/bubblegum-entity/version.svg)

> Access to settings and states for widgets of the Bubblegum UI toolkit

## Model

### Attribute

An attribute represents a small piece of information such as a [Semantic
triple](https://en.wikipedia.org/wiki/Semantic_triple).

```
attrLabel =
{ id = Just "id:1234"
, key = "ui:label"
, facets = ["blue"]
, values = ["Some label"]
}

```

### Outcome

An outcome is a type which borrows concepts from both Elm Maybe and Result.

```
type Outcome value
= Valid value
| None
| Warning String
```

### Settings

A settings entity represents some configuration that is applied to a widget.

```
{
attributes = [
attr "ui:label" "some label"
, attr "ui:font" "Arial"
]
}

```

### State

A state entity is similar to settings but represents the live state that is
applied to a widget.

```
{
attributes = [
attr "ui:selection" "first item"
]
}

```

### Validation

List of validations that can be applied to an outcome.

For most validations:

-   None will propagate as None.
-   Warning will propagate as Warning.
-   A failure to validate the outcome will produce a Warning.

## Documentation and links

-   [Code Maintenance](MAINTENANCE.md)
-   [Code Of Conduct](CODE_OF_CONDUCT.md)
-   [Contributing](CONTRIBUTING.md)
-   [Glossary](GLOSSARY.md)
-   [Vocabulary used in the code base](CODE_VOCABULARY.md)
-   [Architectural Decision Records](DECISIONS.md)
-   [Contributors](https://github.com/flarebyte/bubblegum-entity/graphs/contributors)
-   [Dependencies](https://github.com/flarebyte/bubblegum-entity/network/dependencies)

## Installation

```bash
elm install flarebyte/bubblegum-entity
```
