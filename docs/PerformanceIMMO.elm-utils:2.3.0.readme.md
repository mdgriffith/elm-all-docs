# perfimmo-elm-utils

# Goal

All common types and functions used by perfimmo dev

# Disclaimer

Could be re-used but the main goal is for our private purpose, could be unstable

# API

## Cmd

Des utilitaires sur les Cmd

## Collection

Des utilitaires sur les collections

## HTML/DOM

Pour controller la propagation des events DOM

## HTTP

### Risky Request
Les requètes AJAX faites par nos applications elm doivent avoir accès à un cookie tiers pour conserver l'authentification.

Il faut donc qu'une application en `localhost` puisse envoyer le cookie à `back-dev.com` on doit donc utiliser `Http.riskyRequest`

### HATEOAS
On a introduit une abstraction `RestNavigationLink` comme structure de donnée pour que le back fournisse au front le moyen de naviguer

### Data

Des listes de données utiles (comme la liste des pays en français par exemple)