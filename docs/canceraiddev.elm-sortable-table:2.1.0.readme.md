# Sortable Tables

Fork and extension of [evancz/elm-sortable-table](https://package.elm-lang.org/packages/evancz/elm-sortable-table/latest) adding in paginated table support.

Create sortable (and paginated) tables for data of any shape.

This library also lets you customize `<caption>`, `<tbody>`, `<tr>`, etc. for your particular needs. So it is pretty easy to do whatever crazy CSS trickery is needed to get the exact table you want. You can also add custom pagination controls. We have implemented the Bulma pagination [component](https://bulma.io/documentation/components/pagination/).

## Examples

1. [U.S. Presidents by Birth Place](https://canceraiddev.github.io/elm-sortable-table/presidents.html) / [Code](https://github.com/canceraiddev/elm-sortable-table/blob/main/examples/Presidents.elm)
2. [Travel Planner for the Mission District in San Francisco](https://canceraiddev.github.io/elm-sortable-table/travel.html) / [Code](https://github.com/canceraiddev/elm-sortable-table/blob/main/examples/Travel.elm)
3. Paginated Table of Elements / [Code](https://github.com/canceraiddev/elm-sortable-table/blob/main/examples/Elements.elm)

## Usage Rules

- Always put `Table.State` in your model.
- Never put `Table.Config` in your model.

One of the core rules of The Elm Architecture is **never put functions in your `Model` or `Msg` types**. It may cost a little bit of extra code to model everything as data, but the architecture and debugging benefits are worth it. Point is, a `Table.Config` value is really just a bunch of `view` functions, so it does not belong in your model. It goes in your `view`!

Furthermore, you do not want to be creating table configurations dynamically, partly because it is harder to optimize. If you need multiple table configurations, it is best to create multiple top-level definitions and switch between them in your `view` based on other data in your `Model`. If your use case is so complex that this is not possible, please open an issue explaining your situation!
