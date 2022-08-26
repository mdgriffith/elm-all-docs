# elm-pascal-voc

Elm library for encoding and decoding PASCAL Visual Object Class XML format (http://host.robots.ox.ac.uk/pascal/VOC/).

Supported XML tags in this library are;
- folder
- filename
- path
- source
- size
- object (Annotation)

This library may not provide tags which are not used frequently.


## How to use

```elm
import PascalVoc
import PascalVoc.Decode
import PascalVoc.Encode


sampleXmlString = """
<annotation>
  <folder>Train</folder>
  <filename>sample.png</filename>
  <path>/my/path/Train/sample.png</path>
  <source>
    <database>Unknown</database>
  </source>
  <size>
    <width>224</width>
    <height>224</height>
    <depth>3</depth>
  </size>
  <object>
    <name>sample-annotation</name>
    <bndbox>
      <xmin>82</xmin>
      <xmax>172</xmax>
      <ymin>88</ymin>
      <ymax>146</ymax>
    </bndbox>
  </object>
</annotation>
"""


-- Decoding
data = PascalVoc.Decode.decode sampleXmlString
Result.map PascalVoc.filename data == "sample.png"

-- Access to an annotation object
Result.map PascalVoc.objects data == [ 
        { name = "sample-annotation"
        , bndBox = { xmin = 82, xmax = 172, ymin = 88, ymax = 146 }
        , pose = Nothing
        , truncated = Nothing
        , difficult = Nothing 
        }
    ]


-- Encoding
Result.map PascalVoc.Encode.format data
```
