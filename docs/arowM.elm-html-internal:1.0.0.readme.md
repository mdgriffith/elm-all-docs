# HTML internal

Use [arowM/html](https://github.com/arowM/html).
This is not supposed to be used directly.


## Examples

```elm
import Batchable.Html as Html exposing (Html, Attribute)
import Batchable.Html.Attributes as Attributes
import Batchable.Html.Events as Events


mixin : msg -> Attribute msg
mixin onClick =
    Attributes.batch
        [ Attributes.class "foo"
        , Events.onClick onClick
        ]

mixin2 : Bool -> Attribute msg
mixin2 p =
    if p
        then Attributes.none
        else Attributes.class "bar"
```
