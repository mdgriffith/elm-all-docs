# L0

This package provides an experimental fault-tolerant parser 
for L0, a simple yet versatile 
markup language that takes inspiration from Lisp.  Here is a fragment
of text in L0:

    | title
    About L0
    
    L0 is an experimental markup language 
    with a minimal syntax consisting mostly 
    of [i elements] and [i blocks].

Elements can be nested, e.g., `[i This is [blue [b very] blue text]]`,
so that "This is" is rendered in italic, "very" in blue text 
with a bold font, and "blue text" in italic blue.

See [About L0](https://l0-lab-demo.lamdera.app/p/pu-ca417-qg051)
for more.  Also, here is a [demo](https://l0-lab-demo.lamdera.app/).  You can sign
up, create, edit and keep documents with a free account.  You
can also create documents without signup.  Good for 
experimentation, but your work will not be saved.

## Using this package

The rough and ready solution is to either copy the `app` folder 
in the GitHub repo and just use or modify the app. More ambitioulsly 
copy the `app/src/Render` folder and
use the function 

```
Render.L0.renderFromString : Int -> Settings -> String 
                             -> List (Element MarkupMsg)
```

The first argument is an integer counter that is incremented
when the source text changes. It is need to ensure that
the virtual DOM is properly updated. For the settings you can use `Render.Settings.defaultSettngs`.



The advantage of this approach is that the 
apparatus for parsing is decoupled from that for rendering. Consequently you are free to modify the rendering code as you 
please or to replace it with something entirely of your own design.

## Parser Operation Principles

The parser operates as follows:

- The input text is parsed into a list of blocks.  These are 
strings augmented by an integer which gives the indentation
of a block.

- The list of blocks is transformed to a tree of blocks, where the tree
structure corresponds to the level of indentation.

- An expression parser is mapped over the tree, returning a tree of 
"Expression blocks."  The expression parser operates by first
tokenizing the block content. The tokens are consumed in
by a state machine that operates a stack of tokens.  
Depending on the token and the state, the token is either
converted to an expression abd pushed onto the output stream 
or, alternatively, pushed onto the token stack.  The stack is reduced
to an expression whenever it is legal to do so, 
then pushed onto the output  stream.  An error results
if the stack is non-empty 
when the end of input occurs. In this event, an error handling
function is invoked.  The result to produce a 
valid AST in all cases.  In the case of an error, the "corrected"
AST contains a note about the status and location of the error.

It is not hard to design a renderer to take advantage of the 
resulting AST in such way that errors are signaled in an 
unobtrusive way, e.g. by rendering in red a leading bracket that 
has no matching right bracket.  The goals in all cases are that

- The full text be always parsed
- Errors be signaled in place in the rendered in a discreet 
and helpful way.

