The [billstclair/elm-xml-extra](http://package.elm-lang.org/packages/billstclair/elm-xml-extra/latest) package is an extension of the [billstclair/elm-xml-eeue56](http://package.elm-lang.org/packages/billstclair/elm-xml-eeue56/latest) package that simplifies creating Decoders for XML it parses.

[![Build Status](https://travis-ci.org/billstclair/elm-xml-extra.svg?branch=master)](https://travis-ci.org/billstclair/elm-xml-extra)

Given these definitions:

    import Json.Decoder as JD exposing ( Decoder )
    import Xml.Extra exposing ( decodeXml )

    type alias Person =
        { name : String
        , age : Int
        }

    personDecoder : Decoder Person
    personDecoder =
        JD.map2 Person
            (JD.field "name" JD.string)
            (JD.field "age" JD.int)

    personTagSpecs : List TagSpec
    personTagSpecs =
        [ ("name", Required)
        , ("age", Required)
        ]
       
    xml =
        """
    <?xml version="1.0" encoding="UTF-8"?>
    <person>
      <name>noah</name>
      <age max="100">50</age>
    </person>
        """

Here's the code to turn that XML string into a `Person` object:

    decodeXml xml "person" personDecoder personTagSpecs

There's a more complicated example at the top of the documentation for the `Xml.Extra` module.

If your XML has more than one top-level tag, you can use the other exported functions, which the code for `decodeXml` should help you understand, to handle it.

There's an example in the [`example`](https://github.com/billstclair/elm-xml-extra/tree/master/example) directory.

There are `elm-test` tests in the [`tests`](https://github.com/billstclair/elm-xml-extra/tree/master/tests) directory.
