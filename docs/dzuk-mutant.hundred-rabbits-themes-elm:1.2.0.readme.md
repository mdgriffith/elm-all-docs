# Hundred Rabbits themes

Decode theme files and use themes that conform to the [Hundred Rabbits theme framework](https://github.com/hundredrabbits/Themes) in your application.

![A basic test app showing a Hundred Rabbits Theme palette below an upload input.](example.png)

[Full example of theme loading.](https://ellie-app.com/c7Szykmmdc6a1)

---


### Make your own themes:

```
import Color exposing (rgb255) -- avh4/elm-color

myTheme : HRTheme
myTheme = { background = rgb255 224 177 203
        , fHigh = rgb255 35 25 66
        , fMed = rgb255 94 84 142
        , fLow = rgb255 190 149 196
        , fInv = rgb255 224 177 203
        , bHigh = rgb255 255 255 255
        , bMed = rgb255 94 84 142
        , bLow = rgb255 190 149 196
        , bInv = rgb255 159 134 192
        }

```

### Tiny example of decoding:

[Go here for a full example of theme decoding.](https://ellie-app.com/c7Szykmmdc6a1)

```
import Xml.Decode as XD -- from ymtszw/elm-xml-decode
import HRTheme

hundredRabbitsTheme = XD.run HRTheme.decoder xmlString

```

### Export themes:

```
import File.Download as Download
import HRTheme

save : Theme -> Cmd msg
save theme =
    Download.string "theme.svg" "image/svg+xml" (HRTheme.toXmlString theme)


```