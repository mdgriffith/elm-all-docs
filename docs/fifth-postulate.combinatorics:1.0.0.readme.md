# combinatorics
Pure Elm project providing common combinatoric primitives like permutations and
selections. 

[_Combinatorics_][combinatorics] is

> an area of mathematics primarily concerned with counting, both as a means and
> an end in obtaining results, and certain properties of finite structures. It is
> closely related to many other areas of mathematics and has many applications
> ranging from logic to statistical physics, from evolutionary biology to computer
> science, etc.

## Usage
You can install the package with the following command.

```sh
elm install fifth-postulate/combinatorics
```

Proceed to import the package in your code and use it.

```elm
import Combinatorics

permutations : List (List Int)
permutations =
    Combinatorics.permutationsOf [1, 2, 3, 4]
```

[combinatorics]: https://en.wikipedia.org/wiki/Combinatorics
