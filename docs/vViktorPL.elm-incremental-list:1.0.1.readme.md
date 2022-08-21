# elm-incremental-list

This library makes it easy to generate lists similarly to `List.range`
except you can provide custom increment/decrement functions.


## Why?

Suppose you have the following Date API:

    type alias Date =
        { year : Int
        , month : Int
        , day : Int
        }

    nextDay : Date -> Date
    prevDay : Date -> Date

and you would like to generate range of dates from 2019-01-01 to 2019-01-07.
`IncrementalList.range` function can be used in a following way:

    dateRange =
        IncrementalList.range prevDay nextDay

    startingDate =
        { year = 2019
        , month = 1
        , day = 1
        }

    dates = dateRange startingDate 5

And if you want range between 2019-12-25 and 2019-01-01 you can use the following:

    dates = dateRange startingDate -7

So, to sum up, this function makes it easy to create range generator of some
custom data type by providing increase/decrease functions.

See more code examples in `IncrementalList.range` function docs.