
# jxxcarlson/elm-markdown

[![Elm package](https://img.shields.io/elm-package/v/jxxcarlson/elm-markdown.svg)](https://package.elm-lang.org/packages/jxxcarlson/elm-markdown/latest/)

The aim of this Markdown library is
to provide a pure Elm implementation of Markdown
which offers a small set of optional extensions:

- Standard: the usual thing
- Extended: strike-though text, tables, Poetry and Verbatim blocks, 
better image handling, extensible block and inline elements,
SVG figures, apply a CSS class to an inline element
- ExtendedMath: like Extended, but math formulas written in
TeX/LaTeX, eg.,
```
This **is** a test: $a^2 + b^2 = c^2$.
```
are properly rendered.


## How to use it


For simple applications, follow the code in `./example/src`, e.g,

```
view model =
    Html.div []
        [ Markdown.Render.toHtml ExtendedMath sourceText
            |> Html.map MarkdownMsg
        ]
```

This example shows how to include mathematical
formulas and SVG figures.  To run the example, do this:

```
$ cd example
$ sh make.sh
```

Then open `public/index.html` with your browser.


## Demos

See the `./Demos` folder for examples.
Best to look at `./Demos/simplest` first.  
The other examples
include extra bells, whistles and optimizations
that are useful for interactive editing environments
and documents with a lot of mathematics.  

Links to live demos:

- [simplest](https://jxxcarlson.github.io/app/mathMarkdownLive/)
- [simple](https://jxxcarlson.github.io/app/mathMarkdownSimple/) — includes export to MiniLaTeX.
- [markdown.minilatex.app](https://markdown.minilatex.app)


This package is still evolving.  I regret
publishing so many updates, but I am using it in several apps, and this
is the only way I know how to encapsulate the complexity, work
 with the CI build systems, and keep my sanity

## Installing a Demo


For example:

```bash
$ cd to ./Editors/fancy

$ vr make

```


**NOTES** 

- `vr` is the command for Umberto Pepato's script runner,
[Velociraptor](https://dev.to/umbo/velociraptor-an-npm-style-script-runner-for-deno-26a).
It is elegant and simple, with the scripts stored in `scripts.yaml` To use 
it, you need to have installed [Deno](https://deno.land/), advertised as *a modern and secure 
runtime for JavaScript and TypeScript that uses V8 and is built in Rust.*

- If you don't use Velociraptor, just peek inside `scripts.yaml` for whatever shell commands you need.
Usually just the `make` command.  


## Style

The style used by the library is entirely determined by the
definitions of the CSS classes that you refer to in your
`index.html`.  The ones used for the demo apps are found
in `./public/assets/style.css` when you are in the folder
for one of the Editor examples.
You can easily reconfigure the CSS to satsify your
own esthetics.


## Markdown extensions

Here are the main additions:    


- Poetry blocks are
are like quotation blocks, except that they begin
with ">>" instead of ">".  White space and line endings are respected
in poetry blocks.  

- Verbatim blocks are like code blocks,
except that they are set off by four backticks instead of
three.  No syntax coloring is applied to verbatim blocks.

- Tables

- Extension blocks.  These begin with the token `@@`, e.g, 
`@@svg` for SVG figures as explained below.  The general form
is `@@cmd arg1 arg2 ...` on the first line followed by the
body of the element: zero or more non-blank lines followed
by a blank line.  The argument list may be empty.  Unimplemented
blocks are rendered verbatim.  If you want to make a comment
in the text but not have it show up in the rendered version,
use the `@@invisible` block, like this:

    ```
    @@invisible
    This is not to be seen!
    ```

- Inline extensions.  These have the form `@cmd[arg]`
For example, the text `@red[very hot stuff]` renders  *very hot stuff*
in red.  The `cmd` is a CSS class name, and that class is applied to
the text `arg`.  The class name can
be anything, but to have an effect, it must be defined in `./public/assets/style.css`.
We have defined the following CSS classes: `red`, `green`, `blue`, `pale`, 
`highlight`, and `censored`.
The first four color the text.  The last two change the background
color: yellow, yellow, and black, respectively.  We may define more interesting inline
extensions later that do not rely on CSS, or entirely on CSS.  
For these, the `cmd` will be a kind of reserved word. We think 
of it as a function that is applied to`arg`.  The CSS definitions should reside 
in `public/assets/style.css`.  See that code in `Demos/simple`.

## SVG

You can add SVG images like this:

```
@@svg
<svg width="100" height="100">
<circle cx="50" cy="50" r="40" stroke="blue" stroke-width="3" fill="cyan" />
</svg>
```

### Images

The usual `![My favorite image](imageUrl)` does the usual thing, with the image 
scaled to 100% of the width. You can 
also say `![My favorite image::left](imageUrl)` or 
`![My favorite image::right](imageUrl)` to float the image left or right at 
40% width. The widths are defined in `style.css`.

## Advanced Usage: AST

If you 
wish to write your own renderer, or do other fancy things,
you will want to produce and manpulate the AST:

```
Markdown.Parse.toMDBlockTree : Version 
       -> Option -> Document -> Tree MDBlock
```

where `Version` is an integer and `Document` is a type alias for `String`.  
This is also useful if you wish to transform the abstract syntax tree before 
rendering it. The `Version` parameter may be set to zero if you do not
have to worry about updated thd ids of rendered elements in an interactive 
editing environment.



## Editor

The fancy demo app now uses [pure Elm text editor](https://package.elm-lang.org/packages/jxxcarlson/elm-text-editor/latest/).
It is very much a work in progress. 

## Bugs and whatnot

Please write me at jxxcarlson@gmail.com or post an
issue on the [Github repository](https://github.com/jxxcarlson/elm-markdown)
regarding bugs or anything else. I will steer
this library towards the Commonmark spec to the greatest
extent possible by the method of successive approximations


## Recent Changes

- Added `nolang` support for the syntax highlighter.  Thus in code blocks
set off by triple backticks where the language is not supported by the 
syntax highlighter, use `nolang` in place of `elm`, `python`, etc.  Currently 
supported languages are css, elm, javascript, json, python, sql, and xml.

- Added the function `Markdown.LaTeX.export` to export Markdown text to MiniLaTeX.

- Added the function `Markdown.Parse.toTextTree : Tree MDBlock -> Tree String`

- Added the @@-block element to the parser.  Allows further
extension to the syntax (see section SVG above)

-  Made substantial changes to simplify the API.

- Changed the return type of the rendering functions: the return type 
`Html  msg` is replaced by `Html MarkdonMsg`. This change
 makes the rendered text "active," e.g., can respond to clicks.
 See next item.
 
- Added `sourceMap : Tree MDBlockWithId -> BiDict String String` in the 
`Markdown.Parse` module as a hook for host programs to implement 
bidrectional sync of source and rendered text. 



## Thanks

Thanks to Folkert de Vries and Luke Westby.  A shout-out
to Folkert for an optimiztaion of the pure text 
rendering (10 x speedup).  A thankyou to Anton-4 for 
significant code cleanup and adding `nolang` support
for the syntax highlighter. 

