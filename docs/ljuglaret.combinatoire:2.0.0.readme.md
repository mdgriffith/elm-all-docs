## Elm Combinatoire

Permet de générer toutes les combinaisons d'une liste 

### Exemples 

```elm 
choices [1,2,3] ==
    [[],[3],[2],[2,3],[3,2],[1],[1,3],[3,1],[1,2],[2,1],[1,2,3],[2,1,3],[2,3,1],[1,3,2],[3,1,2],[3,2,1]]
```

```elm  
split [1,2,3] ==
    [([1],[2,3]),([1,2],[3])]
```` 