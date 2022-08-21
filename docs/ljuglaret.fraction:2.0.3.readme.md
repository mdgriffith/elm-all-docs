# Fractions

Allows manipulation of fractions : simplify, add two fractions, create a fraction, access the numerator and denominator.

## How to use this package

### Create Fractions

```elm
f0 : Maybe Fraction
f0 = createFraction(40,30)
-- Just (Fraction { denominator = 30, numerator = 40 })
```

```elm
f1 : Maybe Fraction
f1 = createFraction(17,15)
-- Just (Fraction { denominator = 15, numerator = 17 })

f2 : Maybe Fraction
f2 = createFraction(17,0)
-- Nothing : Maybe Fraction
```

### Add two fractions and simplify

```elm
s : Maybe Fraction
s = f0 |> (Maybe.andThen (\m ->
        f1 |> (Maybe.andThen (\m2 ->
            Just (simplify (addition m m2))))))
```

### Access the denominator and numerator

```elm
a =  f1 |> (Maybe.andThen (\m -> Just (getNumerator m)))
b =  f1 |> (Maybe.andThen (\m -> Just (getdenominator m)))
-- a = Just 17
-- b = Just 15
```
