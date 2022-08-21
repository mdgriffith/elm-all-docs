# elm-transition

This package aims to solve the headache involved in having css transitions in your elm application by moving the state needed for them into a custom element and keeping your models simpler

## Installation

Add the elm and js dependencies to your project

```shell
elm install nanahs/elm-transitions
npm install --save-dev elm-transitions
```

Add the custom element to your js entrypoint

```js
...

import { Elm } from "./src/Main.elm";
import Transitions from "./vendor/Transitions.js";

const root = document.querySelector("#app div");
const app = Elm.Main.init({ node: root });

Transitions.start(app);

...
```

## Example

```elm
import Transitions

myView
    |> Transitions.make
        { isShowing = model.isShowing
        , enter = "transition-opacity duration-500"
        , enterFrom = "opacity-0"
        , enterTo = "opacity-100"
        , onEnter = Just TransitionIncrease
        , leave = "transition-opacity duration-500"
        , leaveFrom = "opacity-100"
        , leaveTo = "opacity-0"
        , onLeave = Just TransitionIncrease
        }
    |> Transitions.view

```

## TODO

- Add code examples without tailwindcss
- Change to config pattern, everything is required and won't transition properly without them

## Inspsired by Headless UI transition

https://headlessui.dev/react/transition
