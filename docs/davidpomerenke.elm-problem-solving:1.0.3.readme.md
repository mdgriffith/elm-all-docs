# ![elm-problem-solving](https://github.com/davidpomerenke/elm-problem-solving/raw/main/elm-problem-solving-600.png)

- __Use examples and templates of standard problems: Vacuum world, sliding puzzle, queens puzzle, Knuth conjecture, graph search, motion planning. Or formalize your own problem.__
- __Apply powerful search algorithms to find the solution: Depth-first search, breadth-first search, uniform-cost search (Dijkstra's algorithm), greedy search, and best-first (A\*) search.__
- __Visualize the search state space as a scatter plot, tree, tree map, or network graph; live while searching.__
- __Use a low-code dashboard to get started.__

## [Documentation](https://package.elm-lang.org/packages/davidpomerenke/elm-problem-solving/latest/Problem)

## Examples

[Introductory example on Ellie.](https://ellie-app.com/bv2YzcWHG7ha1)

1. [[Live]](https://davidpomerenke.github.io/elm-problem-solving/1-dashboard/index.html)
   [[Code]](docs/1-dashboard/src/Main.elm)
   Creating a powerful dashboard by just enumerating what you would like to include. 
2. [[Live]](https://davidpomerenke.github.io/elm-problem-solving/2-minimal/index.html)
   [[Code]](docs/2-minimal/src/Main.elm)
   Live-searching for a problem solution, a minimal example.
3. [[Live]](https://davidpomerenke.github.io/elm-problem-solving/3-visual/index.html)
   [[Code]](docs/3-visual/src/Main.elm)
   Visualizing the searched state space as a tree, tree map, or scatter plot.
4. [[Live]](https://davidpomerenke.github.io/elm-problem-solving/4-graph/index.html)
   [[Code]](docs/4-graph/src/Main.elm)
   Visualizing the searched state space as a network graph. 
5. [[Live]](https://davidpomerenke.github.io/elm-problem-solving/5-tooltip/index.html)
   [[Code]](docs/5-tooltip/src/Main.elm)
   Adding a tooltip with information about the individual states to the visuals.
6. [[Live]](https://davidpomerenke.github.io/elm-problem-solving/4-graph/index.html)
   [[Code]](docs/4-graph/src/Main.elm)
   Combining all the techniques to create the same dashboard as in _1._, but with much more code.

(The examples can be found in the `docs` folder.)

## Structure

- Problem
- Problem.Example
- Problem.Search
- Problem.Search.Visual
- Problem.Search.Dashboard

## Screenshots

![Screenshots of 2 search visual dashboards.](https://github.com/davidpomerenke/elm-problem-solving/raw/main/dashboards-600.png)

## Related work

- This module roughly follows the standard textbook [*Artificial Intelligence - A Modern Approach*](http://aima.cs.berkeley.edu/) (*AIMA*) by Stuart Russell and Peter Norvig. Their [aimacode/aima-javascript](https://github.com/aimacode/aima-javascript) project also contains some visualizations.
- [the-sett/ai-search](https://github.com/the-sett/ai-search): Search algorithms in Elm, also including bounded search and iterative deepening. I found this when I had already written my algorithms, so it's independent.
- [Guided implementations](https://www.redblobgames.com/pathfinding/a-star/implementation.html) of A\* search for Python, C++, and C#.

[![Github actions elm-test status](https://github.com/davidpomerenke/elm-problem-solving/workflows/elm-test/badge.svg)](https://github.com/davidpomerenke/elm-problem-solving/actions?query=workflow%3Aelm-test)