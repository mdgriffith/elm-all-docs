# elm-ra

Ra supports Pointfree style in Elm by providing various combinators to work with Predicates, Relations, Math, Functions, and Flow Control.

## Categories

- Predicate Combinators: `allPass`, `anyPass`, `both`, `either`, `complement`, `false`, `true`
- Chain and Composition Friendly Relations: `lessThan`, `lessThanEqualTo`, `greaterThan`, `greaterThanEqualTo`, `equals`
- Chain and Composition Friendly Math: `adding`, `subtracting`, `dividedByInt`, `dividedByFloat`, `multiplying`, `negated`
- Flow Control: `ifElse`, `cond`, `condDefault`, `when`, `maybeWhen`, `unless`, `until`
- Function Combinators: `converge`, `converge3`, `convergeList`, `curry`, `curry3`, `flip`, `fnContraMap`, `fnContraMap2`, `fnContraMap3`, `uncurry`, `uncurry3`

## Name and Relation to RamdaJS

Ra is a subset of RamdaJS converted to Elm and excluding functions relating to topics indicated below.

### Excellent elm-community Extra packages such as

Many of the RamdaJS functions or their equivalent functionality can be found in these packages.

- [Maybe.Extra](https://package.elm-lang.org/packages/elm-community/maybe-extra/latest/)
- [List.Extra](https://package.elm-lang.org/packages/elm-community/list-extra/latest/)
  - aperture is [groupsOfWithStep](https://package.elm-lang.org/packages/elm-community/list-extra/latest/List-Extra#groupsOfWithStep)
- [Dict.Extra](https://package.elm-lang.org/packages/elm-community/dict-extra/latest/)
  - [groupBy](https://package.elm-lang.org/packages/elm-community/dict-extra/2.4.0/Dict-Extra#groupBy)
  - indexedBy is [fromListBy](https://package.elm-lang.org/packages/elm-community/dict-extra/2.4.0/Dict-Extra#fromListBy)
  - countBy is one List.map away from [frequencies](https://package.elm-lang.org/packages/elm-community/dict-extra/2.4.0/Dict-Extra#frequencies)

### Object Meta-Programming

RamdaJS features a number of functions to manipulate JavaScript objects. The closest equivalent in Elm would be Dict which already features all of the necessary functions
either through Core or Dict.Extra. Further, Dict is not the same as Record and has a number of tradeoffs when compared to Records.

- Loss of explicit type contract
  - Requiring neurotic optionality checks (i.e. Dict.get returns a Maybe)
- A Dict can only hold values of a single type while a Record may feature a different type for each field.

### Relating to Optics (Lens)

There are several high quality Elm packages that provide optics.

### Higher-Kinded Types and Categories

Elm does not feature higher kinded types or typeclasses and so we cannot express abstract

- `map` (Functor)
- `chain` (Monad)
- `append` (Monoid)
- `sequence`/`traverse` (Applicative, Traversable).

**NOTE** We get better error messages, fewer opportunities for ambiguous code, and, very likely, a faster compiler in the exchange.

## Value Proposition

The value of Pointfree is to improve readability and safety. The goal is not to reduce keystrokes or to seem clever!

Generally, readable pointfree style involves trading low signal lambda argument names for high signal top-level function names. Just as the return on investment of unit testing
increases when the code under test relies on abstractions rather than concretions (DI), pointfree return on investment increases when the code is written to declare
normalized (typically small) and meaningfully named top level functions. Remember that the goal is to increase the ratio of semantically rich domain terms to programming language and
computer science-y tokens. Pointfree becomes an indecipherable mess when expressions contain more combinators than they do named domain functions. This is often a sign of anemic types or
functions that do too much such that they cannot be re-composed.

### Less Decoding

The declaration of a lambda with an argument and repetitious application of the argument introduces noise that can obscure the meaning by forcing the reader to decode.

```elm
|> List.filter (\person -> person.isHungy && (Person.canEat meal person))
```

By contrast, the pointfree version is purely declarative, has fewer moving parts, and a less ambiguous interpretation.

```elm
|> List.filter (both .isHungry (Person.canEat meal))
```

A lambda creates an execution context that captures the outer enclosing environment. The result is that the reader must _consider_ the possible
impact of code at an elevated scope which both increases the cognitive load of reading the code and also increases the possibility for certain mistakes.

### Safer

When creating a lambda it is impossible to inadvertently apply values from the outer scope, but this is impossible with pointfree because functions are only composed and not applied or called. Consider the code below
which checks if the passed `person` is hungry and then checks if `personB` can eat the meal (where `personB` has presumably been declared in an outer scope).

```elm
-- Whoops! personB is a typo (possibly from code completion) that type-checks but is not what the author intended
|> List.filter (\person -> person.isHungy && (Person.canEat meal personB))
```

By contrast, the declarative pointfree version provides no opportunity to make such a mistake. The predicate will operate on only a single person.

```elm
|> List.filter (both .isHungry (Person.canEat meal))
```

### Increased Signal

When writing pointfree where it makes sense, it subsequently increases the information communicated to the reader when pointfree is **not** used. For example, when observing a lambda one might reasonably suspect

- it is required for recursion
- or there are multiple arguments that must be combined in interesting ways
- or there is interesting interaction with arguments and let bindings in the outer scope.
