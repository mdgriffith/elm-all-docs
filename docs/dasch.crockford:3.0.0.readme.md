# Crockford's base32 encoding in Elm

Encode integers as [Crockford-style base32 strings](https://www.crockford.com/base32.html).

From the specification:

> Base 32 is a textual 32-symbol notation for expressing numbers in a form that can be conveniently and accurately transmitted between humans and computer systems. It can be used for out of band communication of public keys.
>
> The encoding scheme is required to
>
>   - Be human readable and machine readable.
>   - Be compact. Humans have difficulty in manipulating long strings of arbitrary symbols.
>   - Be error resistant. Entering the symbols must not require keyboarding gymnastics.
>   - Be pronounceable. Humans should be able to accurately transmit the symbols to other humans using a telephone.

This package provides functions for encoding and decoding base32 data.

## Examples

```elm
-- Encodes a non-negative integer as a base32 string according to Crockford's encoding scheme.
Crockford.encode 1337 --> Ok "19S" : Result Crockford.Error String

-- Decodes a base32 string into a non-negative integer.
Crockford.decode "19S" --> Ok 1337 : Result Crockford.Error Int

-- Negative integers cannot be encoded.
Crockford.encode -1 --> Err NegativeNumberError : Result Crockford.Error String
```

It's also possible to have a checksum number appended to the string when encoded. This checksum number will be used to validate the correctness of the encoded number when decoding.

```elm
Crockford.encodeWithChecksum 32 --> Ok "10*" : Result Crockford.Error String

Crockford.decodeWithChecksum "10*" --> Ok 32 : Result Crockford.Error Int

Crockford.decodeWithChecksum "10~" --> Err Crockford.InvalidChecksum : Result Crockford.Error Int
```
