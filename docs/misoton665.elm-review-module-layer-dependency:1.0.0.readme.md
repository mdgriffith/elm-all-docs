# elm-review-module-layer-dependency

[elm-review](https://github.com/jfmengels/elm-review) rules to detect violation of module importing by you defined layers.

If you defined a layer dependency rule like `A <- B`, elm-review-module-layer-dependency will detect an error with below importing.
```elm
module A

import B.Data
```

Module A depends on module B (`A -> B`) is a violation of defined rule.

## Configuration

```elm
module ReviewConfig exposing (config)

import NoViolationOfModuleLayerDependency exposing (ModuleLayer(..), ModuleLayerDependency(..))
import Review.Rule exposing (Error, Rule)


config : List Rule
config =
    [ NoViolationOfModuleLayerDependency.rule moduleLayerRule
    ]


moduleLayerRule : ModuleLayerDependency
moduleLayerRule =
    ModuleLayerDependency
        [ infraLayer
        , applicationLayer
        , DefaultLayer
        , adapterLayer
        ]


adapterLayer : ModuleLayer
adapterLayer =
    ModuleLayer
        [ [ "Adapter" ]
        , [ "Main" ]
        ]


applicationLayer : ModuleLayer
applicationLayer =
    ModuleLayer
        [ [ "Application" ]
        ]


infraLayer : ModuleLayer
infraLayer =
    ModuleLayer
        [ [ "Infra" ]
        ]
```

If you want to define a `Page` layer that is under UI.Pages, write this.

```elm
pageLayer : ModuleLayer
pageLayer =
    ModuleLayer
        [ [ "UI", "Pages" ] -- It means "Any modules under UI.Pages.*".
        ]
```