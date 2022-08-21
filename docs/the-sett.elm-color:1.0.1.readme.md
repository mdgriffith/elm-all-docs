# A simple color module for Elm

This module provides a simple way of describing colors as RGB with alpha transparency, based on this simple data structure:

```
type alias Color =
    { red : Int, green : Int, blue : Int, alpha : Float }
```

This module is intended as a stand-in to help upgrade Elm 0.18 applications that were using the old `Color` module
there. That module was deliberately removed, so this module does not exactly replicate it.

## Why no HSLA representation/how is this different to the old `Color` module?

The pixels on your screen are colored in levels of RGB and graphics chips process colors as 4-vectors or RGB and alpha channel. An HSL representation can be useful, but will always be rendered down to RGBA. For this reason, I see no real loss of efficiency in supporting only the RGBA representation in this simple implementation. There are functions to construct this from HSL and HSLA representations.

The intention here is not to assist with the manipulation of colors and color spaces, it is simply to provide a simple and convenient representation of color for rendering purposes.

For this reason, the `Gradient` type and related functions from the old `Color` module were also dropped. It is a case of do the math yourself, you will only find a minimal set of basics here.
