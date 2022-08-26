# elm-bag

A bag, also known as a multiset, is unordered like a set, but can hold multiple copies of each value.

## Examples

Create a bag:

    bag = fromList ['a', 'b', 'b']

Count the number of copies of a value in a bag:

    count 'b' bag == 2

Insert values into a bag:

    insert 1 'a' bag == fromList ['a', 'a', 'b', 'b']

Remove values from a bag:

    remove 1 'b' bag == fromList ['a', 'b']
