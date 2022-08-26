# Lλmbda

A simple implementation of
[Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus) with
[Hindley-Milner type inference](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system) in Elm.

Lambda calculus is a very simple
[Turing complete](https://en.wikipedia.org/wiki/Turing_completeness) computational model.
This makes it very straightforward to evaluate, optimize, translage, and this makes it a very good candidate for a language intermediate representation.

```elm
import Lambda exposing (Error(..), Expr(..), Type(..), evaluate)
import Lambda.Read
import Lambda.Write


-- Evaluate a text expression, and return us the result and its type.
eval : String -> Result Error (String, String)
eval txt =
    Lambda.Read.expression txt
        |> Result.andThen evaluate
        |> Result.map
            ( Tuple.mapBoth
                Lambda.Write.expression
                Lambda.Write.type_
            )


-- Builtin values
eval "42" --> Ok ("42", "@Int")
eval "3.14" --> Ok ("3.14", "@Num")

-- Variables (must be defined in an abstraction)
eval "x" --> Err (VariableNotFound "x")

-- Abstraction
eval "λx.42" --> Ok ("λx.42", "a->@Int")
eval "λx.x" --> Ok ("λx.x", "a->a")
eval "λx.y" --> Err (VariableNotFound "y")

-- Application
eval "1 2" --> Err (TypeMismatch IntType (AbsType IntType (Type "a")))
eval "λf.f 42" --> Ok ("λf.f 42", "(@Int->a)->a")
eval "(λx.x) 42" --> Ok ("42", "@Int")

-- Variable declaration (syntax sugar)
eval "x=42; x" --> Ok ("42", "@Int")
eval "f=λx.42; f" --> Ok ("λx.42", "a->@Int")
eval "f=λx.42; f 3.14" --> Ok ("42", "@Int")
```
