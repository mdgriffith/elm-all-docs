# Mask

Simple input and string masking library.

## Example

```elm
type Msg
    = PhoneUpdated String


type alias Phone =
    { number : String

    -- ...
    }


update : Msg -> Phone -> Phone
update msg phone =
    case msg of
        PhoneUpdated number ->
            { phone | number = number }


phonePattern : Pattern
phonePattern =
    Mask.fromString "(###)###-####"


view : Phone -> Html msg
view { number } =
    input
        [ maskedValue phonePattern number
        , onMaskedInput phonePattern number PhoneUpdated
        ]
        []
```
