<img src="/meta/phosphor-mark-tight-yellow.png" width="128" align="right" />

# phosphor-elm

Phosphor is a flexible icon family for interfaces, diagrams, presentations — whatever, really. Explore all our icons at [phosphoricons.com](https://phosphoricons.com).

This implementation is inspired by [elm-feather](https://package.elm-lang.org/packages/1602/elm-feather/latest).

[![GitHub stars](https://img.shields.io/github/stars/phosphor-icons/phosphor-elm?style=flat-square&label=Star)](https://github.com/phosphor-icons/phosphor-elm)
[![GitHub forks](https://img.shields.io/github/forks/phosphor-icons/phosphor-elm?style=flat-square&label=Fork)](https://github.com/phosphor-icons/phosphor-elm/fork)
[![GitHub watchers](https://img.shields.io/github/watchers/phosphor-icons/phosphor-elm?style=flat-square&label=Watch)](https://github.com/phosphor-icons/phosphor-elm)
[![Follow on GitHub](https://img.shields.io/github/followers/rektdeckard?style=flat-square&label=Follow)](https://github.com/rektdeckard)

## Installation

```bash
elm install phosphor-icons/phosphor-elm
```

## Usage

All icons have six weights; `Regular`, `Thin`, `Light`, `Bold`, `Fill`, and `Duotone`. Rendering an icon requires just a template and a weight:

```elm
import Phosphor exposing (IconWeight(..))

-- Within your view:
Phosphor.checks Bold
    |> Phosphor.toHtml []
```

### Styling

Icons behave as text, inheriting the `color` and `font-size` from their parent. Further styling can be applied with the helpers `withSize`, `withSizeUnit`, and `withClass`.

```elm
Phosphor.cloud Duotone
    |> withSize 24
    |> withSizeUnit "px"
    |> withClass "custom-icon"
    |> toHtml []
```

By default all icons render at `1em` with the class `ph-icon`.

## Our Related Projects

- [phosphor-home](https://github.com/phosphor-icons/phosphor-home) ▲ Phosphor homepage and general info
- [phosphor-react](https://github.com/phosphor-icons/phosphor-react) ▲ Phosphor icon component library for React
- [phosphor-vue](https://github.com/phosphor-icons/phosphor-vue) ▲ Phosphor icon component library for Vue
- [phosphor-icons](https://github.com/phosphor-icons/phosphor-icons) ▲ Phosphor icons for Vanilla JS
- [phosphor-flutter](https://github.com/phosphor-icons/phosphor-flutter) ▲ Phosphor IconData library for Flutter
- [phosphor-webcomponents](https://github.com/phosphor-icons/phosphor-webcomponents) ▲ Phosphor icons as Web Components
- [phosphor-figma](https://github.com/phosphor-icons/phosphor-figma) ▲ Phosphor icons Figma plugin
- [phosphor-sketch](https://github.com/phosphor-icons/phosphor-sketch) ▲ Phosphor icons Sketch plugin

## Community Projects

- [phosphor-react-native](https://github.com/duongdev/phosphor-react-native) ▲ Phosphor icon component library for React Native
- [phosphor-svelte](https://github.com/haruaki07/phosphor-svelte) ▲ Phosphor icons for Svelte apps
- [phosphor-r](https://github.com/dreamRs/phosphoricons) ▲ Phosphor icon wrapper for R documents and applications
- [blade-phosphor-icons](https://github.com/codeat3/blade-phosphor-icons) ▲ Phosphor icons in your Laravel Blade views

If you've made a port of Phosphor and you want to see it here, just open a PR [here](https://github.com/phosphor-icons/phosphor-home)!

## License

MIT © [Phosphor Icons](https://github.com/phosphor-icons)
