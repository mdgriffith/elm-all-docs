# svg-text-fonts

svg-text-fonts supports converting strings to text suing OpenType fonts, and rendering
to SVG paths.

One propblem with SVG is that it is not possible to get the size of a piece of text
prior to rendering it, which can make it difficult to draw boxzes neatly around text.
This library allows  converting text into SVG paths so that their bounding box can be
accurately known ahead of rendering.

Text can also be rendered as SVG paths instead of by the browser, which can help with
geometric accuracy, and will allow fonts to animate smotthly without jittering caused by
browser text rendering using hinting to make text more legible. The text will be slightly
rougher this way, but this will not be so visible whilst text is being animated.

You can switch between path and broweser rendiring easily, as the there are 2 rendering
functions with a common type. This makes it possible to switch to path rendered text during
animation and back to browser rendered text when static, to improve legibility and ensure
text always looks crisp.

## How to use.

The application using this package must supply a pair of ports and link them up to
opentype.js. The ports module should look like:

    port module SVGTextPort exposing (textToSVG, textToSVGResponse)

    import SVGTextSPI exposing (TextToSVGPort, TextToSVGResponsePort)


    {-| Requests that text is converted to SVG.
    -}
    port textToSVG : TextToSVGPort msg


    {-| Creates a subscription to listen for responses to requests to convert text
    to SVG
    -}
    port textToSVGResponse : TextToSVGResponsePort msg

The Javascript could should look like:

    const TextToSVG = require('text-to-svg');
    const SimpleCache = require('./simple-cache').Storage;

    const Elm = require('../elm/Main');

    const fontCache = new SimpleCache();

    app.ports.textToSVG.subscribe(request => {
      fontCache.async(request.font, {
        set: function(setValue) {
          TextToSVG.load(require('./fonts/' + request.font + '.ttf'), function(err, textToSVG) {
            setValue(textToSVG);
          });
        },
        get: function(value) {
          convertTextToSVG(request, value);
        }
      });
    });

    function convertTextToSVG(request, textToSVG) {
      const metrics = textToSVG.getMetrics(request.text, {
        fontSize: request.fontSize,
        kerning: request.kerning,
        letterSpacing: request.letterSpacing
      })

      const pathData = textToSVG.getD(request.text, {
        fontSize: request.fontSize,
        kerning: request.kerning,
        letterSpacing: request.letterSpacing
      })

      const result = {
        id: request.id,
        x: metrics.x,
        y: metrics.y,
        baseline: metrics.baseline,
        width: metrics.width,
        height: metrics.height,
        ascender: metrics.ascender,
        descender: metrics.descender,
        pathData: pathData,
        request: request
      }

      app.ports.textToSVGResponse.send(result);
    };
