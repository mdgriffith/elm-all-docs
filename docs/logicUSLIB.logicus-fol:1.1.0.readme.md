# LogicUS.FOL

## Design Goals

This package has been created to work with computer logic, specifically with First Order Logic. For a series of types and functions have been created that allow the definition and interpretation of formulas as well as the application of the main algorithms to reduce the consistency of formulas and sets.

## Overview

The _LogicUS.FOL_ packages allow working with formulas and sets in First Order Logic. It includes aspects like L-Structures valuation, substitution performing, normal forms, clauses and other algorithms like Semantic Tableaux, Herbrand Works or Resolution. Next, we make a synopsis of each of the modules exposed:

- **_LogicUS.FOL.SintaxSemantics_**:
  It constitutes the basis of first logic, so that it exposes the syntax for the definition of the formulas and substituions (including all the operations with it, like clausre, variable renaming, ...) as well as the semantics for the L-Structure and its evaluation.

- **_LogicUS.FOL.SemanticTableaux_**: It develops all the necessary tools for working with semantic boards in FOL, distinguishing the different types of formulas and rules and also allowing the visualization of the complete board.

- **_LogicUS.FOL.NormalForms_**: It contains the functions necessary for the transformation of formulas into normal forms: Prenex, Skolem, NNF, CNF, DNF.

- **_LogicUS.FOL.Clauses_**: It provides some functions that allow work with first order clauses, definition, operations, transformation of formulas and sets into clausal sets, ...

- **_LogicUS.FOL.Herbrand_**: It defines the functions necessary for the application of the Herbrand Works (Universe, interpretations, models, ...)

- **_LogicUS.FOL.Unification_**: It provides the functions for working with the unification algorithms: terms and atoms MGU.

- **_LogicUS.FOL.Resolution_**: It gives the functions for working with the resolution algorithm in FOL and its representation. (Future features: resolution strategies).

You can access to the installation guide, theoretical and practical contents, and more at [LogicUS](https://ramgonvictor.wixsite.com/logicus).
