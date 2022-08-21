# Babel Elm Assets Plugin

This Babel plugin allows you to search for a particular function call in Elm, and replace it with a `require()` JS call.
This allows you to use webpack generated assets directly in your Elm code.

## Usage

```elm
import WebpackAsset exposing (assetUrl)

imageUrl =
    assetUrl "./lost.png"

image : Html Msg
image =
    img [ src imageUrl, alt "Image of man looking lost" ] []
```

At runtime `imageUrl` will be set to the full path Webpack generates to point to "list.png". Often this will end up with a hash in the name: `lost.6f3a4c.png`, or with a path to the place your assets are stored.

## Configuration

Add the elm package

    elm install cultureamp/babel-elm-assets-plugin

Add the babel plugin using Yarn (or NPM)

    yarn add --dev babel-elm-assets-plugin

Add the following rules to your webpack config:

```js
// webpack.config.js
  rules: [
    {
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      use: [
        // babel-loader modifies the ouput of elm-webpack-loader
        {
          loader: "babel-loader",
          options: {
            plugins: ["module:babel-elm-assets-plugin"]
          }
        },
        {
          loader: "elm-webpack-loader",
          options: {
            // ...your usual options
            // There may be some issues with using this plugin with optimized Elm builds
            optimize: false
          }
        }
      ]
    }
  ],
```

### Advanced configuration

You can use multiple Babel plugins to post-process your Elm code. This allows you to:

* Use elm-css-modules-plugin
* Use multiple instances of babel-elm-assets-plugin so that you can have it work for functions other than `WebpackAsset.assetUrl`

Here's a more complicated example, where we include CSS modules, as well as a custom SVG loader.

```elm
-- Icon.SvgAsset.elm
type alias SvgAsset =
    { id : String
    , viewBox : String
    }

svgAsset : String -> SvgAsset
svgAsset path =
    -- these placeholder values are replaced by Webpack at build time
    { id = "elm-svg-asset-placeholder"
    , viewBox = "0 0 0 0"
    }
```

Notice here that calls to `Icon.SvgAsset.svgAsset` will expect to hold a `SvgAsset`, as compared to calls to `WebpackAsset.assetUrl`, which will hold a `String`.

Now, the webpack config:

```js
// webpack.config.js
  rules: [
    {
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      use: [
        {
          loader: "babel-loader",
          options: {
            plugins: [
              "module:elm-css-modules-plugin",
              // If you use a plugin multiple times, you need to specify it as an array ["module:path", options, "unique-name"]
              ["module:babel-elm-assets-plugin", {}, "assets-plugin-generic"],
              [
                "module:babel-elm-assets-plugin",
                {
                  // "author/project" is the default value if no "name" field is specified in elm.json.
                  package: "author/project",
                  module: "Icon.SvgAsset",
                  function: "svgAsset"
                },
                "assets-plugin-svg"
              ]
            ]
          }
        },
        {
          loader: "elm-webpack-loader",
          options: {
            // ...your usual options
            // There may be some issues with using this plugin with optimized Elm builds
            optimize: false
          }
        }
      ]
    }
  ],
```

## How it works

Let's work through the example above.

```elm
-- Main.elm
import WebpackAsset exposing (assetUrl)

imageUrl =
    assetUrl "./lost.png"

image : Html Msg
image =
    img [ src imageUrl, alt "Image of man looking lost" ] []
```

Normally when you compile this with Elm, the generated JS will look like:

```js
var cultureamp$babel_elm_assets_plugin$WebpackAsset$assetUrl = function (path) {
  return path;
};
var author$project$Main$imageUrl = cultureamp$babel_elm_assets_plugin$WebpackAsset$assetUrl(
  "./lost.png"
);
```

Now our Babel plugin can transform that JS to use a require call:

```js
var cultureamp$babel_elm_assets_plugin$WebpackAsset$assetUrl = function (path) {
  return path;
};
var author$project$Main$imageUrl = require("./lost.png");
```

Which webpack will know how to handle, meaning your final JS will do something similar to:

```js
var cultureamp$babel_elm_assets_plugin$WebpackAsset$assetUrl = function (path) {
  return path;
};
var author$project$Main$myImageUrl = "/assets/lost-0fabe3.png";
```

---

The babel-elm-assets-plugin is maintained by the Delivery Engineering Team at Culture Amp.
