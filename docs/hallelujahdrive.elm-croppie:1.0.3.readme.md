![build](https://github.com/hallelujahdrive/elm-croppie/workflows/build/badge.svg)
# Croppie for Elm

This is a wrapper library of [Croppie](https://github.com/foliotek/croppie/)

_Croppie is a fast, easy to use image cropping plugin with tons of configuration options!_


## Links

### Demos
- [Croppie](https://foliotek.github.io/Croppie)
- [Croppie For Elm](https://hallelujahdrive.github.io/elm-croppie)

### GitHub
- [foliotek/croppie](https://github.com/foliotek/croppie/)
- [hallelujahdrive/elm-croppie](https://github.com/hallelujahdrive/elm-croppie)

## The Basics
```elm
import Croppie

view =
    Croppie.croppie [] [ src "images/demo-1.jpg" ]
    
```

## Installation
Elm:
```
elm install hallelujahdrive/elm-croppie@1.0.3
```

Then add the following elements to your page:
```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/elm-croppie@1.0.3/dist/elm-croppie.css" />
<script src="https://unpkg.com/elm-croppie@1.0.3/dist/elm-croppie.js"></script>
```

If you use bundler please install the Javascript and CSS assets via npm:
```
npm install elm-croppie@1.0.3
```

Then in your Javascript add a following import:
```javascript
require("elm-croppie");
```


## Usage
You can initialize ElmCroppie with the following elm code:

```elm
import Croppie
import Croppie.BindOptions exposing (..)

port croppie : Croppie.Data -> Cmd msg

view =
    Croppie.croppie [] [ id "item" ]
    
function =
    croppie <|
        Croppie.function "item" ...
```

You also need the following javascript code to communicate on the port.
```javascript
const app = Elm.Main.init({
    node: document.getElementById("elm")
});

app.ports.croppie.subscribe((data) => {
    ElmCroppie.port(data);
});
```

## Important Notes
Croppie uses `canvas.drawImage(...)` to manipulate images. Thus, images must obey the CORS policy. More info can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).

## Who

_Croppie was built by [Foliotek](http://www.foliotek.com/) for use in Foloptek Presentation._

And, elm-croppie was built by hallelujahdrive.

Please submit any issue or question on [Github](https://github.com/hallelujahdrive/elm-croppie/issues).
