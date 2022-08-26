# Zipper

Think of a Zipper as a way of holding onto a datastructure, 
and at the same time providing a way of focused maneuvering inside the data structure. 

At any time the data at the focus can be updated, and when the Zipper is "unzipped" the
data structure will have had all of the updates applied.


For example, suppose we have the following types:
```
type alias Company =
    { ceo : Person
    , cto : Maybe Person
    }


type alias Person =
    { email : String
    , pay : Pay
    }


type alias Pay =
    { salary : Float
    , bonus : Maybe Float
    }

```

We wish to have a way to increase a company's cto's bonus by a multiplication factor.  
One might do the following:

```
updateBonus : Float -> Company -> Company
updateBonus f c =
    let
        updatePayBonus pay =
            { pay | bonus = pay.bonus |> Maybe.map ((*) f) }

        updatePersonBonus person =
            { person | pay = person.pay |> updatePayBonus }
    in
    { c | cto = c.cto |> Maybe.map updatePersonBonus }

```

Using a zipper one can traverse to the bonus part of the data structure, transform it and
retrieve the fully transformed data structure. 

```
updateCtoBonus : Float -> Company -> Company
updateCtoBonus f c =
    c
        |> zip
        |> into .cto (\cto company -> { company | cto = cto })
        |> intoMaybe .pay (\pay cto -> { cto | pay = pay })
        |> andThenInto .bonus (\bonus pay -> { pay | bonus = bonus })
        |> mapMaybe (\bonus -> bonus * f)
        |> unzip
```