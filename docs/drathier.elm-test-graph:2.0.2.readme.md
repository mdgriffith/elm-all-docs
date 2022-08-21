# elm-test-graph
Concurrency tests for [elm-test](/packages/elm-explorations/test/latest). Give us a graph of partially ordered operations and expectations, and we'll generate total orderings from your graph, and execute them as tests. Hopefully, we'll find some concurrency errors this way.

Here's an example test that concurrently inserts three different numbers into a set, checks that they were in fact inserted, removes them, and finally checks that the resulting set is empty again.

`insertData 11 (Modify (\set -> Set.insert 1 set))` adds a node with id `11` to the graph, containing an instruction to `Modify` the current test model, by inserting the value `1` into a set using the function `Set.insert`. Nodes containing an `Expect` action run an elm-test expectation on the current state.

Nodes are then connected to form a partial order. `insertEdge 11 12` says that the action stored in the node with id `11` must happen before the action stored in the node with id `12`. It's a simple `happens-before` relation.

```
empty
  |> insertData 11 (Modify <| Set.insert 1)
  |> insertData 12 (Expect <| \set -> set |> Set.member 1 |> Expect.true "1 should be a member")
  |> insertData 13 (Modify <| Set.remove 1)
  |> insertEdge 11 12
  |> insertEdge 12 13
  --
  |> insertData 21 (Modify <| Set.insert 2)
  |> insertData 22 (Expect <| \set -> set |> Set.member 2 |> Expect.true "2 should be a member")
  |> insertData 23 (Modify <| Set.remove 2)
  |> insertEdge 21 22
  |> insertEdge 22 23
  --
  |> insertData 31 (Modify <| Set.insert 3)
  |> insertData 32 (Expect <| \set -> set |> Set.member 3 |> Expect.true "3 should be a member")
  |> insertData 33 (Modify <| Set.remove 3)
  |> insertEdge 31 32
  |> insertEdge 32 33
  --
  |> insertEdge 13 100
  |> insertEdge 23 100
  |> insertEdge 33 100
  |> insertData 100 (Expect (\set -> set |> Set.isEmpty |> Expect.equal True)

```
