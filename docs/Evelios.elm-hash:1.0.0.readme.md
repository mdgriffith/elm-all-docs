# Elm-Hash

Generate unique hash ids for arbitrary data structures. This library allows you to create a unique id for your custom objects/types. This library also lets you create order dependent and order independent hashing of information in your object. If your custom type's uniqueness doesn't depend on all the information stored in your object, this library can help you define only the data that is important for the hash id.

You should be able to generate a hash of any data structures similar to how you would build up a JSON encoder for your object. There are some use cases where generating hashes for every object is  not necessary. If your object is simple enough, then you should look for implementations of data structures that use an [association list](https://en.wikipedia.org/wiki/Association_list) as a means of determining uniqueness of your object. These don't require specific implementations and accesses of hash ids.

## Hashing Examples

Most implementations will probably use order dependent hashing. You should be using order dependent hashing for most ordinary situations like creating an id for user data.

In the off chance that you want two variables to be interchangeable, you can make the hash order independent. For example, we would want to use order independent hashing when trying to compute a hash value for line segments when order of the endpoints does not matter.

```elm
import Hash exposing (Hash)


-- Order Dependent Hashing

type alias Point =
    { x : Float
    , y : Float
    }
    
    
pointId : Point -> Hash
pointId point =
    Hash.dependent
        (Hash.fromFloat point.x)
        (Hash.fromFloat point.y)
        
        
pointId { x = 8 , y = 3 }
    |> Hash.toString
    --> "4269273855388784538"

pointId { x = -1 , y = 6 }
    |> Hash.toString
    --> "8005943415991586028"

-- Order Independent Hashing
        
type alias Segment =
    { start : Point
    , end : Point
    }
    
    
segmentId : Segment -> Hash
segmentId segment =
    Hash.independent
        (pointId segment.start)
        (pointId segment.end)
        

segmentId
    { start = { x = 8 , y = 3 }
    , end = { x = -1 , y = 6 }
    }
    |> Hash.toString
    --> "92430261986604902146641202584312969021"

segmentId
    { start = { x = -1 , y = 6 }
    , end = { x = 8 , y = 3 }
    }
    |> Hash.toString
    --> "92430261986604902146641202584312969021"
```
