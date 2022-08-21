# Elm Zen CSS Bootstrap

`elm-zen-css-bootstrap` provides all the [Bootstrap](https://getbootstrap.com/) classes for using with 
[`elm-zen-css`](https://package.elm-lang.org/packages/decioferreira/elm-zen-css/latest/).

## Install

Start by installing the elm dependencies `elm-zen-css` and `elm-zen-css-bootstrap`:

```
elm install elm-zen-css 
elm install elm-zen-css-bootstrap
```

You will also need to include Bootstrap’s CSS on your `index.html` file, by placing the `<link>` tag 
in the `<head>`:

```
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
```

You can find more details about this on [Get started with Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/). You can also [download ready-to-use compiled code for Bootstrap v5.2.0](https://getbootstrap.com/docs/5.2/getting-started/download/)
to easily drop into your project.

## Example

Find more details on the [example directory](example).

## Development

### Upgrade

The current bootstrap version supported by this package is 5.2.0. When a new version of bootstrap
has been released, it can be download and converted to elm, with the following command:

```
npm run upgrade -- -d https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css
```

The first time this command runs with the `--download` flag, the downloaded file is stored on
`tmp/bootstrap.min.css`. Once the file is on disk, the same command can be ran without the 
`--download` flag:

```
npm run upgrade
```