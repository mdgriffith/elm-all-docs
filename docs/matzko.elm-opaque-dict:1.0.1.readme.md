# Elm Opaque Dictionary

Make dictionaries in Elm with arbitrary types for the keys.

## Motivation

Elm's `Dict` allows you to make dictionaries with keys that have to be restricted to comparable types (`Int`, `Float`, `Char`, `String`, and tuples or lists of those).

But often you might want to make a dictionary where the key type is an opaque type, not a primitive. For example:

    type UserId = UserId Int

It would be useful to have a user dictionary in which the keys are the user Ids, like so:

    Dict UserId User

But you can't do that with `Dict`. The purpose of this module, `OpaqueDict`, is provide that functionality with a drop-in replacement for `Dict`. The main difference is that in a few places you have to provide a function that converts the key type to a string.

## Examples

    {-| Sample animal groups.
    -}
    type AnimalGroup
        = Feline
        | Canine
        | Rodent


    {-| Get the string form of an animal group.
    -}
    animalGroupToString : AnimalGroup -> String
    animalGroupToString group =
        case group of
            Feline ->
                "feline"

            Canine ->
                "canine"

            Rodent ->
                "rodent"

    animalCounts : OpaqueDict AnimalGroup Int
    animalCounts =
        [ ( Canine, 5 )
        , ( Feline, 3 )
        ]
            |> OpaqueDict.fromList animalGroupToString
            |> OpaqueDict.get Feline
            -- Just 3
