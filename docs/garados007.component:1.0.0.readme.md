# Component

If you want to split your big Elm application in smaller well known and tested chunks the elm core
library has some usefull functions: `Html.map`, `Cmd.map` and `Sub.map`. It has a
high advantage to do this because the chunks are reusable, easier to read, understand and test.

But there is a small problem with this style: these chunks are well isolated and cannot easily
communicate with its host. On the one side it is easy for a host to inject messages into the
component (you just need to expose some message types with helper methods) but on the other side it
is difficult for the component to do so.

So far I know there are some methods to enable bidirectional communication between host and
component:

## Expose the message type to the host

You just need to expose the details of your message type to your host. In Elm 0.18 it was possible
to expose a subset of the details but in 0.19 you can only expose all of it or nothing.

If you expose the component message types your update method of the host needs to check if some
specific messages are called.

```elm
update hostMsg hostModel =
    case hostMsg of
        ...
        WrapMyComponent MyCompEvent1 -> ... -- handle component event 1
        WrapMyComponent MyCompEvent2 -> ... -- handle component event 2
        WrapMyComponent compMsg -> MyComponent.update ... -- handle other cases by the component itself
        ...
```

But this approach has some dissadvantages:
- all of the internal stuff is exposed to the host and can be manipulated all time (this can lead to
  corrupt component states)
- you need a very good documentation to describe which messages the host can catch and which not
- you are doing very often `Task.perform ... <| Task.succeed ...` in your update methods to call
  your special event messages.

## The host provides some of its messages to call

This approach is commonly used in many elm packages. The host initialize some static object and the
initializer provides all required events. After that the static object has everything what the host
needs to work with the component.

This looks like this:

```elm
type HostMsg
    = ... -- host internal messages
    | WrapMyComponent MyCompMsg
    | MyCompEvent1 ...
    | MyCompEvent2 ...
    ... -- maybe other components

-- initialize the static component handler and provide the needed methods
component : MyComponent HostMsg
component = MyComponent.init WrapMyComponent MyCompEvent1 MyCompEvent2 ...

init =
    { ...
    -- use the preconfigured model
    , component = component.model
    , ...
    }

update hostMsg host =
    case hostMsg of
        ...
        -- handle component internal messages
        WrapMyComponent compMsg ->
            Tuple.mapFirst
                (\newComp -> { host | component = newComp })
            <| component.update compMsg host.component
        -- handle component events
        MyCompEvent1 ... -> ... 
        MyCompEvent2 ... -> ...
        ...
```

This has the advantage that you have a clean border between host and component but this puts a big
workload on both sides:
- The component is required to provide a special initialization and needs to wrap its own messages.
- If you want to test the component you need to provide a thin host to implement the handling of the
  event messages.
- The host needs to provide a large amount of messages for all its internal stuff and the
  components. It is difficult to group related messages together (all this needs extra code).

## Return the events as a third paramater in the update call

> Spoiler alert: This is the method this library uses.

The `update` method normaly returns two things: one is the new component model and the other thing
are some commands that needs to be executed on the core runtime. This approach adds a third return
that express the list of called events. 

The events are special messages that are reserved for the host and the host can decide what to do
with and can even ignore them.

```elm
-- component update
update : Msg -> Model -> (Model, Cmd Msg, List Event)
```

Another pro is that the host can group all component related things together and no large message
types are required.

An example would look like this:

```elm

type HostMsg
    = ...
    | WrapMyComponent MyCompMsg -- the host only needs to wrap the component internal messages
    | ... 

update msg host =
    case msg of
        ...
        WrapMyComponent compMsg ->
            MyComponent.update compMsg host.component
                |> ... -- handle the message types
        ...
```

The client doesn't need to do something special. Just return the events like it would to with `Cmd`
values.

The host has an additional task to do after applying the update of its model and transforming the
`Cmd` value: It needs to handle the event messages. The handling of the event messages are similar
to the normal update: It can change the host model, create `Cmd` values or sometimes new events for
the host of the host.

This library intends to remove all this complexity and make everything as smooth as possible. 

```elm
-- host

import MyComponent -- the client component
import Component -- this library

update : Msg -> Host -> (Host, Cmd Msg)
update msg host =
    case msg of
        ...
        -- call the update manager
        WrapMyComponent compMsg ->
            Component.update
                MyComponent.update -- the component update method
                handleMyCompEvents -- the event handler
                .component -- get component model
                (\c h -> { h | component = c }) -- set component model
                WrapMyComponent -- wrap component events
                compMsg -- component message
                host -- host model
        ...

-- handle all possible events
handleMyCompEvents : Component.Event -> Host -> (Host, Cmd Msg)
handleMyCompEvents event host =
    case event of
        ...
        MyComponent.Event1 -> ...
        ...
```
