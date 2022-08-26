# Simple functions for working with IP/Subnet

This library contains a number of functions to deal with IP/Subnets.

It allows you to validate a given IP address or subnet mask.

```elm
import IP

type Model =
  { ip : String
  }

view model =
  let
    ip_valid = IP.validate model.ip
  in
    div [classList [(ip_valid, "green_checked")]]
      [ label []
        [ text "IP"
        , input [ type_ "text", value model.ip ] []
        ]
      ]
```
