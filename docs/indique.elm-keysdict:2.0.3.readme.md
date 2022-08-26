> **Moved to [lue-bird/elm-keysset](https://package.elm-lang.org/packages/lue-bird/elm-keysset/latest/)**

&nbsp;

# KeysDict
Have many keys to lookup values.

Let's compare


### normal `Dict`

> You want the value where the key is `1`?

        0 :  🏡
    --> 1 :  🏚
        2 :  🏚

    the key is unique among all items

> Going through while comparing your key.

    the value is 🏚  where the key is `1`

### `KeysDict`

First of all, get used to some names

- a "house" contains aspects that make it unique & aspects that can be shared across all houses
```elm
keepInParserPipelineOperator=
  { operator= "|=" --only one operator should have this symbol!
  , origin= ElmRepoPackage "parser" --is the same for |.
  }
```
- a "door" describes a unique aspect across all houses.
```elm
door .operator
--is a promise, that the operator value is never the same for two houses.
```
So... If you have a key and the type of door it could match, you can find the only matching house and enter.

> You want to enter the house where `🗝️` is `1`?

        🔑= 0, 🏠= 🏚, 🗝️= 2
        🔑= 2, 🏠= 🏡, 🗝️= 0
        🔑= 1, 🏠= 🏚, 🗝️= 1 <--

    🔑, 🗝️: doors you can "open" with a key unique across all houses

> Going through while checking every house, if the `🗝️` matches.

        🔑= 1, 🏠= 🏚, 🗝️= 1  where 🗝️ is 1   
        
> You want to enter the house where `🔑` is `0`?

    --> 🔑= 0, 🏠= 🏚, 🗝️= 2
        🔑= 2, 🏠= 🏡, 🗝️= 0
        🔑= 1, 🏠= 🏚, 🗝️= 1

    🔑, 🗝️: doors you can "open" with a key unique across all houses

> Going through while checking every house, if the `🔑` matches.

        🔑= 0, 🏠= 🏚, 🗝️= 2  where 🔑 is 0

&nbsp;


## 👍 How to `KeysDict`

Try the [ellie for some examples](https://ellie-app.com/cHj9Fy9bpXMa1) (always a version behind).

## Example: cased letters
```elm
type alias CasedLetter=
  { lowercase: Char
  , uppercase: Char
  }

lowerUppercaseLetters: KeysDict CasedLetter
lowerUppercaseLetters=
  KeysDict.enterableBy
    [ door .lowercase, door .uppercase ]
  |>putUp { lowercase= 'a', uppercase= 'A' }
  |>putUp { lowercase= 'b', uppercase= 'B' }
  |>putUp { lowercase= 'c', uppercase= 'C' }

uppercase char=
  lowerUppercaseLetters
  |>enterBy { door= .lowercase, key= char }
  |>Maybe.map .uppercase
```

## A word on `import`s

It's recommended to
```elm
import KeysDict.Uniqueness exposing (door)
import KeysDict exposing
  ( KeysDict
  , houses, enterBy
  , putUp, tearDown
  , foldHouses, countHouses --only if you use them
  )
```
They avoid clutter and shouldn't cause name conflicts.

## Example: periodic table

```elm
type Element=
  Hydrogen
  | Helium

elementAtomicNumberKeysDict=
  KeysDict.enterableBy
    [ door .atomicNumber, door .element ]
  |>putUp { element= Hydrogen, atomicNumber= 1 }
  |>putUp { element= Helium, atomicNumber= 2 }

atomicNumberByElement=
  KeysDict.toDict { key= .element, value= .atomicNumber }
    elementAtomicNumberKeysDict
```

## Example: brackets

```elm
brackets=
  KeysDict.enterableBy
    [ door .opening, door .closing ]
  |>putUp { opening= '(', closing= ')' }
  |>putUp { opening= '{', closing= '}' }

typeChar character=
  case access { door= .open, key= character } brackets of
    Just { closed }->
      String.fromValues [ character, closed ]

    Nothing->
      case access { door= .closed, key= character } brackets of
        Just { open }->
          String.fromValues [ open, character ]
          
        Nothing->
          String.fromChar character

"Typing (: " ++(typeChar '(') ++". Even }: " ++(typeChar '}')
```
&nbsp;


## 👎 How not to `KeysDict`

## Example: automatic answers
```elm
answers=
  KeysDict.enterableBy [ door .youSay ]
  |>putUp { youSay= "Hi", answer= "Hi there!" }
  |>putUp { youSay= "Bye", answer=  "Ok, have a nice day and spread some love." }
  |>putUp { youSay= "How are you", answer= "I don't have feelings :(" }
  |>putUp
      { youSay= "Are you a robot"
      , answer= "I think the most human answer is 'Haha... yes'"
      }
```
Please use a `Dict` where it is more appropriate: **`Dict`s are for one-way access**.

## Example: translation, synonymes...
```elm
englishGerman=
  KeysDict.enterableBy []
  |>putIn { english= "elm", german= "Ulme" }
  |>putIn { english= "git", german= "Schwachkopf" }
  |>putIn { german= "Rüste", english= "elm" }
```
A `KeysDict` is only effective, when there is **only one unique key for each door**.

Please take a look at [elm-bidict](https://github.com/Janiczek/elm-bidict) instead!

## Example: partners, opposites...

Similar to the previous example:
```elm
partners=
  KeysDict.enterableBy
    [ door .partner, door .partnerOfPartner ]
  |>putUp { partner= "Ann", partnerOfPartner= "Alan" }
  |>putUp { partner= "Alex", partnerOfPartner= "Alastair" }
  |>putUp { partner= "Alan", partnerOfPartner= "Ann" }
      --wait, this is no duplicate and is inserted
```
A `KeysDict` ony makes sense, when the **keys describe something different**.
