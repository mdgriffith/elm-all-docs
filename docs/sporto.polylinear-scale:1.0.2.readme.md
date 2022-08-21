# Elm Polylinear Scale

Create a polylinear scales and map values.

As explained here <https://github.com/d3/d3-scale/blob/master/README.md#continuous_domain>

Example polylinear scale:

```
[(0, 0), (100, 50), (300, 100)]
```

This is a scale that maps one domain to a different one. The first value in the tuple is domain A and the second domain B.

For example given value 100 in domain A you want to know the equivalent in domain B which would be 50.


```elm
scale = polylinearScale [(0, 0), (100, 50), (300, 100)]

scale 100 == 50
scale 150 == 62.5
```

