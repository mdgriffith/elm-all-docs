# elm-ui-hexcolor
Implements a String -> Element.Color function for elm-ui to work with CSS Hex Colors. 

# Install
```
elm install juliusl/elm-ui-hexcolor
```

# Usage
```elm 
import Element
import Element.HexColor

rgbaColor: Element.Color
rgbaColer = 
    rgbaCSSHex "#7f11e088"

rgbColor: Element.Color
rgbColor = 
    rgbCSSHex "#7f11e0"

```