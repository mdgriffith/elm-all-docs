# elm-wkt

This library is a naive, incomplete, yet pragmatic implementation of [OGC 06-103r4 version 1.2.1](http://www.opengeospatial.org/standards/sfa). As such, and as it stands now, it is solely intended for conversion between itself and GeoJSON.

### Install
```
elm-package install StoatPower/elm-wkt
```

### Test
```
npm install
npm run test
```

## Usage

### Read WKT into GeoJson Geometries
```
import GeoJson exposing (..)
import WellKnown exposing (read)

wkt = "GEOMETRYCOLLECTION (POINT (4 6), LINESTRING (4 6, 7 10))"

geometry : Result String Geometry
geometry =
    read wkt
```

### Write GeoJson Geometries to a WKT String
```
import GeoJson exposing (..)
import WellKnown exposing (write)

geometry : Geometry
geometry = 
    GeometryCollection
        [ Point ( 4.0, 6.0, 0.0 )
        , LineString [ ( 4.0, 6.0, 0.0 ), ( 7.0, 10.0, 0.0 ) ]
        ]

wkt : String
wkt =
    write geometry
``` 
