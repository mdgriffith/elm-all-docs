# `Saved a`

A type keeping track of changes to a value since it was last saved.
This is great for building editing interfaces that keep track of whether the user has
made any changes.


## Dealing with an intial unsaved value

Suppose we're writing a text editing application.
`Saved a` assumes that a saved value we can revert to always exists.
For our text editing example such a value can for instance be an empty document.
If we're saving these documents to some backend, we might want to distinguish between this initial unpersisted value and a value that has been persisted to the backend.

One way to do this is to use different types for persisted and unpersisted documents.
For instance, let's assume a document that is persisted on the backend has an id, while one that's not persisted does not.
We can define separate types for documents in these different states:

```elm
type alias PersistedDoc =
    { id : Int
    , title : String
    -- More properties here
    }

type alias UnpersistedDoc =
    { title : String
    -- More properties here
    }

type Model
    = Persisted (Saved PersistedDoc)
    | Unpersisted (Saved UnpersistedDoc)
```

When we perform the initial save, we can turn a `Saved UnpersistedDoc` to a `Saved PersistedCo` using the `map` function.


## Saving data to a server

Lets stay with the example of a text editing application a bit longer.
At some point we'll want to save a version of the document to a backend, keeping track of the progress of this operation and whether it results in a successful safe or not.
The `Saved a` type has no opinion on what it means for a value to be saved, but the [RemoteData](http://package.elm-lang.org/packages/krisajenkins/remotedata/latest) is perfect for this use case.
We can put the `Saved a` and `RemoteData e a` types next to each other on the model:

```elm
type alias Model =
    { doc : Saved Doc
    , saveState : RemoteData Http.Error Doc
    }
```

At this point it looks a bit like by using both `Saved a` and `RemoteData e a` we're duplicating state, but really the above solution precisely tracks the tree versions of a document that are relevant while the document is in the process being saved:
1. The last succesfully saved version, which is tracked by `Saved a`.
2. The version we're currently attempting to save, which is tracked by `RemoteData e a`.
3. The most recently edited version the user is seeing on the screen, which can already have diverged from the version we're currently saving. This version is also traced by `Saved a`.

Once our Http request responds that the save was successfull, we can use `setSaved` to update the last saved value of our document.
