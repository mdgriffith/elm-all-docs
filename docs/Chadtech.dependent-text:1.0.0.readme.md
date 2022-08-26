# Dependent Text

A dependent type is a type that is dependent on certain values. A dependent list type might depend on the list containing at least one element. 

Elm doesnt really have dependent types as far as I can tell. But what you can do as an alternative to dependent types is put more information into your type signatures, which seems to share the same mission as dependent types. By making your types more particular and descriptive, you add conditions on which the compiler might error. If the conditions are things you dont want to happen, that means youve also made those bad things impossible to appear in your code. Often times this is practical. 

In this package however, I am not being practical. This is just a fun experiment. I wanted to see if one could express the exact content of a string in a type signature. Looks like you can!

```elm
import Text exposing (..)


chadtech : Text (C (H (A (D (T (E (C (H ()))))))))
chadtech =
    c (h (a (d (t (e (c (h textEnd)))))))


    -- Text.toString chadtech == "CHADTECH"
```