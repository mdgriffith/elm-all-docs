# k dropdown container
A dropdown container in elm which can keep open when the user clicks inside (if you so choose). This is a reusable view, not a component. I have tried my best to adhere to the elm architecture rather than component based architecture, similar to the guidelines set out in [elm sortable table](https://package.elm-lang.org/packages/evancz/elm-sortable-table/latest). As such, some things in this reusable view have to be handled by you, the user. This will ultimately lead to a simpler application as:

1. There will only be one source of truth (for eg whether the dropdown is open)
2. View functions will remain in the view. This package does not deal with any logic, it is primarily a view.
3. You program will be easier to reason about and compose.

## Quick Installation

### Imports

```
import DropdownContainer as Dropdown
```

### Model

```
type alias Model =
type alias Model =
    { dropdownState : Dropdown.State
    , dropdownVisbility : Dropdown.Visibility
    }

initialModel : Model
initialModel =
    { dropdownState = Dropdown.initialState
    , dropdownVisbility = Dropdown.Closed
    }
```

### Update

You will need at minimum a message to handle:
 - The internal dropdown's state being updated
 - Some message to open your dropdown (eg from a button click or input text box focus)
 - A message which fires when the dropdown loses focus (ie "onblur").
 **Note**: This message may fire when the user clicks an element within the dropdown.
 We use the `dropDownCurrentlyClicked` function when handling this message to determine if
 the user has clicked out of or within the dropdown, and set the dropdown visibility accordingly.

Importantly the update handling is done by you, this package just provides a helper function.
If you decide that you want the dropdown to close even when the user clicks inside then 
write your update logic accordingly.

**Example:**
```
type Msg
    = SetDropdownState Dropdown.State
    | OpenDropdown
    | DropdownBlur


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetDropdownState dropdownState ->
            { model | dropdownState = dropdownState }

        OpenDropdown ->
            { model | dropdownVisbility = Dropdown.Open }

        DropdownBlur ->
            if Dropdown.dropDownCurrentlyClicked model.dropdownState then
                model

            else
                { model | dropdownVisbility = Dropdown.Closed }
```

### View

To render the dropdown, you need to:
 1. Create a `Config`. This takes your `setState` and `dropdownBlur` messages.
 2. Add attributes to your dropdown and trigger (the thing that opens the dropdown) using 
 `attributes` and `triggerAttributes`.
 3. Add relevant html events on your trigger to send a `OpenDropdown` message.

**Example:**
```
dropDownConfig : Dropdown.Config Msg
dropDownConfig =
    { setState = SetDropdownState
    , dropdownBlur = DropdownBlur
    , tabIndex = 1
    }


view : Model -> Html Msg
view model =
    div []
        [ button
            ([ onClick OpenDropdown ] ++ Dropdown.triggerAttributes dropDownConfig)
            [ text "Open dropdown" ]
        , div
            ([ style "width" "150px"
             , style "height" "200px"
             , style "border" "1px solid black"
             , Html.Attributes.tabindex 1
             ]
                ++ Dropdown.attributes model.dropdownState dropDownConfig model.dropdownVisbility
            )
            [ text "Dropdown content here" ]
        ]
```

Notice that the dropdown and the trigger itself are all created by you. Hence you'll need to set the styling of both yourself.
The good thing about this is that you can make it look exactly how you want, in whichever UI library you want.