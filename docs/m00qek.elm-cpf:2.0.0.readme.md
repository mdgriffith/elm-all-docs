elm-cpf
---
Manipulate and generate brazilian CPFs

```elm
repl> Result.map Cpf.show <| Cpf.fromText "12345678909"
-- Ok "123.456.789-09" : Result Cpf.Error String

repl> Result.map Cpf.toString <| Cpf.fromText "12345678909"
-- Ok "12345678909" : Result Cpf.Error String
```

And you can also use the `Random` API

```elm
repl> import Random.Cpf exposing (cpf)
repl> cpf
-- Generator <function> : Random.Generator Cpf.CPF
```
