# Bounded Number

The type `Bounded number` represent a number bounded between a minimum and a maximum.

Once the bounds are set the value of a bounded number can not get greater than its max bound
neither can it get lower than its min bound.

Functions that modify the value of a bound number come in two variants.

1.  The normal variant clips the resulting value within the defined bounds. Functions of this
    variant are `inc`, `dec`, `incBy`, `decBy`, `set` and `map`.
    
    ```elm
    Bounded.between 0 10
        --|> Expect.equal 0 << Bounded.value
        |> Bounded.incBy 2
        --|> Expect.equal 2 << Bounded.value
        |> Bounded.incBy 9
        --|> Expect.equal 10 << Bounded.value
    ```

2.  The trying variant explicitly states whether the result would overrun the defined bounds by
    returning a `Maybe`. These are functions which names are prefixed with "try" like `tryInc`,
    `tryDec`, `trySet`, `tryMap`.

    ```elm
    Bounded.between 0 10
        --|> Expect.equal 0 << Bounded.value
        |> Bounded.tryIncBy 2
        --|> Expect.equal (Just 2) << Bounded.value
        |> Bounded.tryIncBy 9
        --|> Expect.equal Nothing << Bounded.value
    ```

The value of a bounded number can be set directly by the `set` function and read using the `value`
function.

```elm
Bounded.between 0 10
    |> Bounded.set 4
    |> Bounded.value
    --|> Expect.equal 4
``` 

The functions `encode` and `decoder` support a default JSON representation of a bounded number.

Check out the documentation of the functions as well as the fairly complete
[unit tests](tests/BoundedTest.elm). 
