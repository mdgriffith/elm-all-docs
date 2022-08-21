# Store

A simple store with type-safe support for secondary keys with unicity constraints.

Basically a glorified Dict with some logic layered on top of it.

# Example

    import Store as Store

    type alias MyRecord =
        { name : String, age : Int }

    type alias MyIndices =
        { name : Store.Index MyRecord
        , age : Store.Index MyRecord
        }

    system : Store.System MyRecord MyIndices
    system =
        Store.initConfig MyIndices
            |> Store.withIndex .name
            |> Store.withIndex (.age >> String.fromInt)
            |> Store.makeSystem

    main : String
    main =
        let
            ( id, store ) =
                system.initStore
                    |> system.create { name = "John Doe", age = 22 }
        in
        system.getBy .age "22" store
            |> Maybe.map .name
            |> Maybe.withDefault "Not found"

    --> "John Doe"