> **usage DISCOURAGED: use [lue-bird/elm-keysset](https://package.elm-lang.org/packages/lue-bird/elm-keysset/latest/), which allows for multiple keys**

&nbsp;

# PairDict
Lookup value-pairs from the left or the right.

Let's compare


### normal `Dict`

> You want the `🏠` where the `🔑` is `1`?

        < 🔑= 0, 🏠= 🌳 |
      → < 🔑= 1, 🏠= 🍐 |
        < 🔑= 2, 🏠= 🍐 |

> Going through while comparing your `🔑`... Ah! Here it is:

        🍐

### `PairDict`

> You want the pair where `🗝️` is `1` and the pair where `🔑` is `0`?

      → < 🔑= 0, 🗝️= 2 >
        < 🔑= 2, 🗝️= 0 >
        < 🔑= 1, 🗝️= 1 > ←

> Going through while checking every pair, if `🗝️` is equal, then, if `🔑` is equal... Ah! Here they are:

        🔑 is 1 where 🗝️ is 1  and   🗝️ is 2 where 🔑 is 0

&nbsp;


## 👍 How to `PairDict`

## Example: cased letters
```elm
type alias CasedLetter=
  { lowercase: Char
  , uppercase: Char
  }

lowerUppercaseLetters: PairDict CasedLetter Char Char
lowerUppercaseLetters=
  PairDict.empty .lowercase .uppercase
  |>PairDict.putIn { lowercase= 'a', uppercase= 'A' }
  |>PairDict.putIn { lowercase= 'b', uppercase= 'B' }
  |>PairDict.putIn { lowercase= 'c', uppercase= 'C' }

uppercase char=
  PairDict.access .lowercase char lowerUppercaseLetters
  |>Maybe.map .uppercase
```
try in the [ellie for the example cased letters](https://ellie-app.com/bQtcqGFXrgza1)

## Example: periodic table

```elm
type Element=
  Hydrogen
  | Helium

elementAtomicNumberPairdict=
  PairDict.fromList .element .atomicNumber
    [ { element= Hydrogen, atomicNumber= 1 }
    , { element= Helium, atomicNumber= 2 }
    ]

atomicNumberByElement=
  PairDict.toDict
    elementAtomicNumberPairdict
```

## Example: brackets
You have pairs that belong together:
```elm
brackets=
  PairDict.empty .opening .closing
  |>PairDict.putIn { opening= '(', closing= ')' }
  |>PairDict.putIn { opening= '{', closing= '}' }

typeChar character=
  brackets
  |>PairDict.access .open character
  |>Maybe.map
      (\{ closed }->
        String.fromList [ character, closed ]
      )
  |>Maybe.withDefault
      (brackets
      |>PairDict.access .closed character
      |>Maybe.map
          (\{ open }->
            String.fromList [ open, character ]
          )
      |>Maybe.withDefault
          (String.fromChar character)
      )

"Typing (: " ++(typeChar '(') ++". Even }: " ++(typeChar '}')
```
&nbsp;


## 👎 How not to `PairDict`

## Example: automatic answers
```elm
answers=
  PairDict.fromList .youSay .answer
    [ { youSay= "Hi", answer= "Hi there!" }
    , { youSay= "Bye", answer=  "Ok, have a nice day and spread some love." }
    , { youSay= "How are you", answer= "I don't have feelings :(" }
    , { youSay= "Are you a robot"
      , answer= "I think the most human answer is 'Haha... yes'"
      }
    ]
```
please use a `Dict` where it is more appropriate: **`Dict`s are for one-way access**

## Example: translation, synonymes...
```elm
englishGerman=
  PairDict.fromList .english .german
    [ { english= "elm", german= "Ulme" }
    , { english= "git", german= "Schwachkopf" }
    , { german= "Rüster", english= "elm" }
    ]
```
A right → left and backwards relationship is only fitting,
when **left or right don't have multiple translations**.

Please take a look at [elm-bidict](https://github.com/Janiczek/elm-bidict)

## Example: partners, opposites...

Similar to the previous example:
```elm
partners=
  PairDict.empty
  |>PairDict.putIn { partner= "Ann", partnerOfPartner= "Alan" }
  |>PairDict.putIn { partner= "Alex", partnerOfPartner= "Alastair" }
  |>PairDict.putIn { partner= "Alan", partnerOfPartner= "Ann" }
      --wait, this is no duplicate and gets putIned?
```
A `PairDict` ony makes sense, when the **left & right sides describe something different**.
