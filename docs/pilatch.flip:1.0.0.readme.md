# Flip

The old flip function that was removed in 0.19. It takes a function with only two arguments, and returns another function that accepts the parameters in reverse order. Good for pipe chains where you have the function you want, but need its arguments, uh... flipped.

## Example

    subtract a b =
        a - b

    subtract 5 2 --> 3

    fliptract = flip subtract

    fliptract 5 2 --> -3
