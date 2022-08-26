# Elm Provider

In Redux, the common pattern is for your UI modules to come paired as a component and a container. The component does the actual html rendering, while the container constructs `props` from the applications main `state`. You could imagine that looks like this..

```js
// ./greeter/container.js

import Greeter from './component.js'

const mapStateToProps = state => {
    name: [ 
        state.firstName, 
        state.lastName 
    ].join("")
};

export default connect(mapStateToProps, Greeter)

// ./greeter/component.js

export default const ({name}) =>
    (<p>{["Hello", name ].join(" ")}</p>)

```

What the UI component wants is a name to greet, but we need to construct that name from information in state, because the state doesnt just have a thing in it called name.

Personally, I really dont think this component/container pattern is the best way to do things, this repo is really just an experiment. I have met a few people who tried Elm coming from Redux who said they miss the container / component stuff in Redux. This package is for them; to see if what they want is possible in Elm. Its also demonstrate to Redux people a "middle step" between what they are used to an what is normal in Elm.

# Why are containers not good in Elm?

1. Redux people want their components to be agnostic about the shape of their state. They know the view component needs something `A`, and the state has something else `B`, and so they need a step from `B` to `A`. They also know that if they want to re-use the component, their `A` might sometimes come from a `B` and sometimes a `C`. For the component to be re-usable, `A` has to be a de-coupled thing if its going to be used in different places. Furthermore, if going from `B` to `A` is sufficiently complicated, then for organizational and clarity reasons alone you should separate things out. However, (0) Re-use of big UI components is the exception, not the norm, and containers in Redux are very much the norm; (1) The complexity of going from `B` to `A` is usually pretty low, which makes a distinct `B -> A` step superfluous; and (2) if you just took this problem head on, without any for-knowledge of Elm or Redux, the simplest solution would just be to make an ordinary function that goes from `B` to `A`, not to build this process into your framework.
2. Part of why there are containers in Redux is because you need to manually connect your React components to the store and dispatcher. Since Elm is more than just a framework, that connection built into the Html package, and you therefore dont need to implement this connection yourself.
3. Frankly, theres been a lot of concept-creep with containers. What was just a small thing to connect components to the store has expanded into a big thing, just because it could. For some developers, containers have become just a kind of catch-all for stuff React people need to implement, without much thought into whether it really is something your UI framework should be dealing with. In Elm, view functions are strictly about turning the `Model` into `Html`, but in Redux, developers use things like `constructor()` and `componentDidMount()` to implement all kinds of logic, including actions, side effects into the DOM, and http requests. In Elm, the view function has a much narrower role that doesnt include such things.


# Whats in this Package?

There is a module called `Html.Provider` and its identical to the standard `Html` module, except for a few features:
1. The `Html` type in `Html.Provider` is `Html model msg`, where `model` is the data type your components take.
2. Theres `Html.Provider.connect` which takes a `props -> Html model msg` function and a function that maps `model -> props`. 

Poke around in the example project in `./src` to see how it works. I tried to copy the Redux naming scheme directly. Heres maybe the clearest example of what this package provides:

Container
```elm
module Header.Container
    exposing
        ( container
        )

import Header.View exposing (Props)
import Html.Provider as Provider exposing (Html)
import Model exposing (Model)
import Msg exposing (Msg)


mapStateToProps : Model -> Props
mapStateToProps model =
    { greeting =
        if String.isEmpty model.name then
            "Hello you!"
        else
            [ "Hello "
            , model.name
            , "!"
            ]
                |> String.concat
    }


container : Html Model Msg
container =
    Provider.connect
        Header.View.view
        mapStateToProps

```
Component
```elm
module Header.View
    exposing
        ( Props
        , view
        )

import Html.Provider as Html exposing (Html, div, p)
import Model exposing (Model)
import Msg exposing (Msg)


type alias Props =
    { greeting : String }


view : Props -> Html Model Msg
view props =
    p
        []
        [ Html.text props.greeting ]
```