# elm-geodesy

```elm-geodesy``` is a coordinate conversion and transformation package for 
the elm programming language. 

### Install

```
elm install wroge/elm-geodesy
```

### Usage

- Coordinate conversion (Geographic to Web Mercator)

```elm
{ east = 1113194.9079327355, north = 6800125.454397307, h = 0 }
    == (Geodesy.convert Geodesy.geographic (Geodesy.projected Geodesy.webMercator) WGS84.spheroid { lon = 10, lat = 52, h = 0 })
```

- Coordinate transformation (WGS84 Geographic to ETRS89 UTM)

```elm
ETRS89.UTM ETRS89.Zone32 { east = 568649.7015227115, north = 5761510.45470585, h = 0.00006500817835330963 }
    == WGS84.transform WGS84.geographic ETRS89.utm (WGS84.Geographic { lon = 10, lat = 52, h = 0 }
```


### Including

- WGS84
- ETRS89
- DHDN2001
- Web Mercator
- Transverse Mercator
