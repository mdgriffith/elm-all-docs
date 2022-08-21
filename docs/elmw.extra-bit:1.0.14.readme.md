The [bit] is a basic unit of information in information theory, computing.<br>
:package: [Package](https://package.elm-lang.org/packages/elmw/extra-bit/latest/),
:blue_book: [Wiki](https://github.com/elmw/extra-bit/wiki).

<br>

This package includes [bit twiddling hacks] by Sean Eron Anderson and many others.

> Stability: Experimental.

[bit]: https://en.wikipedia.org/wiki/Bit
[bit twiddling hacks]: https://graphics.stanford.edu/~seander/bithacks.html

<br>

```elm
import Bit exposing (..)

count 7
-- 3 (111 ⇒ 3)

parity 8 2
-- 2 (10,00 ⇒ 10)

swap 6 1 0 1
-- 5 (110 ⇒ 101)

reverse 0xFFFF0000
-- 65535 (0x0000FFFF)

signExtend 15 4
-- -1
```

<br>
<br>


## Index

| Method       | Action                                  |
| ------------ | --------------------------------------- |
| [get]        | Get a bit.                              |
| [set]        | Set a bit.                              |
| [toggle]     | Toggle a bit.                           |
| [swap]       | Swap bit sequences.                     |
| [count]      | Count bits set.                         |
| [parity]     | Get n-bit parity.                       |
| [scan]       | Get index of first set bit from LSB.    |
| [merge]      | Merge bits as per mask.                 |
| [interleave] | Interleave bits of two int16s.          |
| [rotate]     | Rotate bits.                            |
| [reverse]    | Reverse all bits.                       |
| [signExtend] | Sign extend variable bit-width integer. |

[get]: https://github.com/elmw/extra-bit/wiki/get
[set]: https://github.com/elmw/extra-bit/wiki/set
[toggle]: https://github.com/elmw/extra-bit/wiki/toggle
[swap]: https://github.com/elmw/extra-bit/wiki/swap
[count]: https://github.com/elmw/extra-bit/wiki/count
[parity]: https://github.com/elmw/extra-bit/wiki/parity
[scan]: https://github.com/elmw/extra-bit/wiki/scan
[merge]: https://github.com/elmw/extra-bit/wiki/merge
[interleave]: https://github.com/elmw/extra-bit/wiki/interleave
[rotate]: https://github.com/elmw/extra-bit/wiki/rotate
[reverse]: https://github.com/elmw/extra-bit/wiki/reverse
[signExtend]: https://github.com/elmw/extra-bit/wiki/signExtend

<br>
<br>


## References

- [Bit], [Nibble], [Byte], [Word]
- [Kilobit], [Kilobyte], [Kibibit], [Kibibyte]
- [Bit field], [Bit array], [Bitwise operation], [Mask]
- [Bit manipulation], [Bit manipulation instruction set], [Bit banging]

[Bit]: https://en.wikipedia.org/wiki/Bit
[Nibble]: https://en.wikipedia.org/wiki/Nibble
[Byte]: https://en.wikipedia.org/wiki/Byte
[Word]: https://en.wikipedia.org/wiki/Word_(computer_architecture)

[Kilobit]: https://en.wikipedia.org/wiki/Kilobit
[Kilobyte]: https://en.wikipedia.org/wiki/Kilobyte
[Kibibit]: https://en.wikipedia.org/wiki/Kibibit
[Kibibyte]: https://en.wikipedia.org/wiki/Kibibyte

[Bit field]: https://en.wikipedia.org/wiki/Bit_field
[Bit array]: https://en.wikipedia.org/wiki/Bit_array
[Bitwise operation]: https://en.wikipedia.org/wiki/Bitwise_operation
[Mask]: https://en.wikipedia.org/wiki/Mask_(computing)

[Bit manipulation]: https://en.wikipedia.org/wiki/Bit_manipulation
[Bit manipulation instruction set]: https://en.wikipedia.org/wiki/Bit_manipulation_instruction_set
[Bit banging]: https://en.wikipedia.org/wiki/Bit_banging

<br>
<br>

[![](https://img.youtube.com/vi/4_zSIXb7tLQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=4_zSIXb7tLQ)
