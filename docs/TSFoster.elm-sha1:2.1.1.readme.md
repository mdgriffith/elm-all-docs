# SHA1

Calculate SHA-1 digests in Elm.

This package supports hashing of:

* `String` using the utf-8 encoding
* `Bytes`, an [`elm/bytes`][elm/bytes] sequence of byte values
* `List Int` where the elements are assumed to be below 256

And can represent the digest as:

* a [hexadecimal] string
* a [base64] string
* `Bytes`
* a `List Int` of byte values

[hexadecimal]: https://en.wikipedia.org/wiki/Hexadecimal
[base64]: https://en.wikipedia.org/wiki/Base64

# [Documentation](https://package.elm-lang.org/packages/TSFoster/elm-sha1/latest/SHA1)

## Release notes

**Upgrading from `1.0.0 <= v < 1.0.4` is *strongly* recommended.** Later
versions are more rigiorously tested, are significantly more performant, contain
bug fixes, and work with elm v0.19.1.

* `2.0.0` prioritises use of [`Bytes`][elm/bytes] over [`List Int`].
* `1.1.0` introduces the option to hash `Bytes` and represent `Digest`s as `Bytes`, without breaking the API.
* `1.0.5` provides the performance improvements of the hashing algorithm in a non-breaking manner.

Please see the [Contributors](#Contributors) section for thanks and more information.

## Examples

```elm
import Bytes.Encode as Encode
import Bytes exposing (Bytes)
import SHA1

digest1 : SHA1.Digest
digest1 = SHA1.fromString "string"

byteValues : List Int
byteValues = [0x00, 0xFF, 0xCE, 0x35, 0x74]

digest2 : SHA1.Digest
digest2 = SHA1.fromByteValues byteValues

buffer : Bytes
buffer =
    List.map Encode.unsignedInt8 byteValues
        |> Encode.sequence
        |> Encode.encode

digest3 : SHA1.Digest
digest3 = SHA1.fromBytes buffer

SHA1.toHex digest1
--> "ecb252044b5ea0f679ee78ec1a12904739e2904d"

SHA1.toBase64 digest2
--> "gHweOF5Lyg+Ha7ujrlYwNa/Hwgk="

SHA1.toByteValues digest3
--> [ 0x80, 0x7C, 0x1E, 0x38
--> , 0x5E, 0x4B, 0xCA, 0x0F
--> , 0x87, 0x6B, 0xBB, 0xA3
--> , 0xAE, 0x56, 0x30, 0x35
--> , 0xAF, 0xC7, 0xC2, 0x09
--> ]
```

## Validation

Not officially validated through [CAVP]/[CMVP], although digests are tested against CAVS responses via [pyca/cryptography].

Validation tests can be run by executing `make cavs`. This requires make, curl, elm, elm-test and gawk. Alternatively, to run all tests, execute `make test` (which also requires elm-format and elm-verify-examples). See the [`Makefile`](./Makefile) for details.

This package is also tested against additional hashes in the documentation (using [elm-verify-examples]), [tests/Tests.elm], and indirectly via [romariolopezc/elm-hmac-sha1’s tests][hmac-tests], and [TSFoster/elm-uuid’s tests][uuid-tests].

Please note that SHA-1 is not “[considered secure against well-funded opponents][sha1-wiki]”, but it does have its uses, including, but not limited to, [version 5 UUIDs][uuid-use].

[CAVP]: https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program
[CMVP]: https://csrc.nist.gov/projects/cryptographic-module-validation-program
[pyca/cryptography]: https://github.com/pyca/cryptography/tree/master/vectors/cryptography_vectors/hashes/SHA1

[elm-verify-examples]: https://github.com/stoeffel/elm-verify-examples
[tests/Tests.elm]: https://github.com/TSFoster/elm-sha1/blob/master/tests/Tests.elm
[hmac-tests]: https://github.com/romariolopezc/elm-hmac-sha1/blob/master/tests/HmacSha1Test.elm
[uuid-tests]: https://github.com/TSFoster/elm-uuid/blob/2.2.0/tests/Tests.elm

[sha1-wiki]: https://en.wikipedia.org/wiki/SHA-1
[uuid-use]: https://package.elm-lang.org/packages/TSFoster/elm-uuid/latest/UUID#childNamed



## Contributors

Special thanks to [Folkert de Vries](https://github.com/folkertdev)
for a major rewrite of this library, including huge [performance][perf-1] [gains][perf-2],
more [rigorous testing], and support for [elm/bytes].
More information can be found on [this Elm Discourse thread][bytes-thread].

[perf-1]: https://github.com/TSFoster/elm-sha1/pull/7
[perf-2]: https://github.com/TSFoster/elm-sha1/pull/8
[rigorous testing]: https://github.com/TSFoster/elm-sha1/pull/6
[bytes-thread]: https://discourse.elm-lang.org/t/fast-pure-elm-sha2-and-soon-sha1/4505

* Thanks to [Colin T.A. Gray](https://github.com/colinta) for finding and [fixing a bug] related to inputs of 311 bytes
* Thanks to [Dimitri Benin](https://github.com/BendingBender) for making this package [work with elm v0.19.1]

[fixing a bug]: https://github.com/TSFoster/elm-sha1/pull/3
[work with elm v0.19.1]: https://github.com/TSFoster/elm-sha1/pull/4


[elm/bytes]: https://package.elm-lang.org/packages/elm/bytes/latest/

## TODO

* Benchmarks
  * Add way to run benchmarks
  * Automate testing that changes do not negatively impact performance?
* Write CONTRIBUTING.md
