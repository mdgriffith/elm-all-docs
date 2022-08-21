# elm-dialog

Elm dialog for showing modal information, errors, and loading status.

Customization for [Bulma](https://bulma.io) is provided in `Dialog.Bulma`.

Currently supports the following dialogs:

- Info
- Error
- HttpError
- Loading

## Examples

We recommend checking out the [examples] ([code]) to get a feel for how it works.

[examples]: https://canceraiddev.github.io/elm-dialog/
[code]: https://github.com/canceraiddev/elm-dialog/tree/main/examples

Run the following commands to test out the examples locally:

```
yarn install
yarn start
```

## Development

```
yarn install
```

### CI

The following commands are run as part of the GitHub Actions Workflow:

```
yarn elm-format --validate src examples
yarn elm-review
yarn elm make
```

### GitHub Pages

To build new pages run the following command and commit the changes to the repo:

```
yarn build:pages
```
