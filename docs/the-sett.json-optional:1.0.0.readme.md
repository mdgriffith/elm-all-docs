**Contacts for Support**
- @rupertlssmith on https://elmlang.slack.com
- @rupert on https://discourse.elm-lang.org

# json-optional

If a record has `Maybe` fields in it, they could be encoded either as `null` or
left out altogether in the corresponing JSON.

A good HTTP API will usually treat `null` or missing in the same way. But there are
unstable APIs out there that treat them differently. For example, a PUT request that
treats `null` as meaning *set something to null*, but missing to mean *leave something
as it currently is*.

This API lets you choose easily whether to use nulls or skip optional fields. It is
also designed to keep the encoder looking clean with `( "fieldName", value )` tuples
aligned in the list (see example below).

An example encoder might look like:

```elm
import Json.Encode.Optional as Opt
import Json.Encode as Encode exposing (Value)

encoder val =
    [ ( "name", fld.name) |> Opt.field Encode.string
    , ( "age", flg.age) |> Opt.field Encode.int
    , ( "petName", fld.petName) |> Opt.optionalField Encode.string
    ]
       |> Opt.objectMaySkip
```
