# LogicUS.PL

## Design Goals

This package has been created to work with computer logic, specifically with propositional logic. For a series of types and functions have been created that allow the definition and interpretation of formulas as well as the application of the main algorithms to reduce the consistency of formulas and sets.

## Overview

Modules designed provides the tools that allow the definition, execution and visualization of main algorithms in the regarding area. In concrete:

- **_LogicUS.PL.SyntaxSemantics_**: It constitutes the basis of propositional logic, so that it exposes the syntax for the definition of the formulas as well as the semantics for their interpretation as well as some basic algorithm in the field of propositional logic.

- **_LogicUS.PL.SemanticTableaux_**: It develops all the necessary tools for working with semantic boards in PL, distinguishing the different types of formulas and rules and also allowing the visualization of the complete board.

- **_LogicUS.PL.NormalForms_**: It contains the functions necessary for the transformation of formulas into normal forms (negative, conjunctive and disjunctive).

- **_LogicUS.PL.Clauses_**: It provides some functions that allow work with propositional clauses, definition, operations, transformation of formulas and sets into clausal sets, ...

- **_LogicUS.PL.DPLL_**: It defines the functions necessary for the application of the DPLL solving algorithm to sets of propositional clauses as well as the search for models, based on this technique. Also, it allows the visualization of the complete board.

- **_LogicUS.PL.Resolution_**: It gives the functions for working with the resolution algorithms implementing different strategies: saturation, regular, best first, linear, positive, negative, unitary, by inputs, ...

- **_LogicUS.PL.CSP_**: It defines the functions necessary for working with BigFormulas including its definition and a basic SAT Solver for solving some (little) CSP.

- **_LogicUS.PL.HornRS_**: It provides the methods and structures for working with Horn Reasoning Systems: rules and facts definition, forward and backward chaining, conversion to Horn clauses, ...


You can access to the installation guide, theoretical and practical contents, and more at [LogicUS](https://www.cs.us.es/~fsancho/LogicUS/).
