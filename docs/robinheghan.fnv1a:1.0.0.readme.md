# FNV-1a

This package lets you hash strings using the FNV-1a algorithm.

FNV is a non-cryptographic hash function. It favors speed over security. Do not rely on this hash function to keep passwords or other sensitive information safe.

In addition to being fast, it also has good avalanche characteristics. This means that small variations in the string become large variations in the hash. In other words, two strings like "common1" and "common2" will end up with two very different hash values, even though they are quite similar.

Hashing equal strings will return the same hash value. Hashing inequal strings should ideally return inequal hash values. In reality, because you're mapping a potentially endless string into a 32-bit bound integer, collisions do occur.

Read more about how [FNV-1a compares against other hash functions](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633).

You can also read more about how [FNV-1a is a good hash function for Elm](https://github.com/robinheghan/fnv1a/blob/main/docs/why_fnv_is_great_for_elm.md).
