# Janiczek/elm-vlq

VLQ ([variable-length quantity](http://en.wikipedia.org/wiki/Variable-length_quantity)) is a way to encode integers via text.

This base64-encoded variant is notably used in [sourcemaps](https://www.youtube.com/watch?v=6LI0BJIiamg).

The minimum and maximum VLQ integer values representable by JavaScript bitwise operators are -2147483648 (-2^31) and 2147483647 (2^31 - 1) respectively.

```elm
VLQ.encode [ 1, 2, 3 ]
--> "CEG"

VLQ.encodeSingle 123456789
--> "qxmvrH"

VLQ.decode "AAAA"
--> Just [ 0, 0, 0, 0 ]

VLQ.decode "Not a VLQ string"
--> Nothing
```

This library is a port of [`Rich-Harris/vlq`](https://github.com/Rich-Harris/vlq/blob/master/src/vlq.ts).
