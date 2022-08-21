# Date and Time Picker

# THIS IS A HEAVILY MODIFIED FORK OF <https://github.com/abadi199/datetimepicker>

# Contributing

To check that the library still compiles:
```
elm make --output=/dev/null
```

To re-compile and open the Demo application:
```
cd demo && elm make Demo.elm && open index.html && cd ..
```


### Digital time picker

Code:
```elm
view model =
    DateTimePicker.dateTimePickerWithConfig defaultDateTimeConfig
        [ class "my-datetimepicker" ]
        model.state
        model.value
```

### Date Picker

Just the date picker without the time.

Code:
```elm
type Msg = DateChange DateTimePicker.State (Maybe DateTimePicker.DateTime)

type alias Model = { value : Maybe DateTimePicker.DateTime, state : DateTimePicker.State }

view model =
    DateTimePicker.datePicker
        DateChange
        [ class "my-datepicker" ]
        model.state
        model.value
```

### Time Picker

Just the time picker without the date.

Code:
```elm
type Msg = TimeChange DateTimePicker.State (Maybe DateTimePicker.DateTime)

type alias Model = { value : Maybe DateTimePicker.DateTime, state : DateTimePicker.State }

view model =
    DateTimePicker.timePicker
        TimeChange
        [ class "my-timepicker" ]
        model.state
        model.value
```

## Documentation

This package follows the `evancz\sortable-table` package approach where it's not a nested elm architecture 'component'. It's just view functions where you feed the data and the message constructor to the function. It does use an opaque `State` to maintain its internal state.

The picker requires the initial value of the date (usually today) to set the initial position of the calendar. To feed this date to the picker's internal state, you can use 2 approaches
- By passing a `Date` value to the `DateTimePicker.initialStateWithToday` function when initialing the picker's State.
- By calling the `DateTimePicker.initialCmd` as part of your `init` commands.

### Views
The date time picker package provides multiple view functions, depending on how you want to use the picker.
- `datePicker` is a simple date picker view, with no time picker, and comes with all default configuration.
- `timePicker` is a simple time picker view, with no date picker, and comes with all default configuration.
- `dateTimePicker` is a simple date and time picker view, comes with all default configuration.
- `datePickerWithConfig` is a configurable date picker view.
- `timePickerWithConfig` is a configurable time picker view.
- `dateTimePickerWithConfig` is a configurable date and time picker view.

### Config
You customize the date picker configuration by passing a `DateTimePicker.Config.Config` value to the picker's view function.
The DateTimePicker.Config module provides some default configurations for both date picker and date time picker.


### Example
Here's a snippet of typical Elm application:
```elm
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

type Msg
    = DateChange DateTimePicker.State (Maybe DateTimePicker.DateTime)

type alias Model =
    { selectedDate : Maybe DateTimePicker.DateTime
    , datePickerState : DateTimePicker.State
    }

init =
    ( { selectedDate = Nothing, datePickerState.initialState }
    , DateTimePicker.initialCmd DateChange DateTimePicker.initialState
    )

view model =
    DateTimePicker.dateTimePickerWithConfig
        DateChange
        [ class "my-datetimepicker" ]
        model.datePickerState
        model.selectedDate

update msg model =
    case msg of
        DateChange datePickerState selectedDate ->
            ( { model | selectedDate = selectedDate, datePickerState = datePickerState }, Cmd.none )

subscriptions =
    ...


```
