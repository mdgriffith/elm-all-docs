# `BoundedList`, a list with a maximum size

When logging things or simply storing undo-history or whatever, it's often the case that we'd like to control how "far back" we can go.
This package is made for this use case.
A `BoundedList` is just a list with a maximum size, if an operation leads to exceeding this capacity, then elements are dropped.

Each operation removes items where it make sense (e.g. if you add at the beginning of a list then the last items are dropped and vice-versa)
