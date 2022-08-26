# A Pure Elm Text Editor


This project, a text editor written in pure Elm, is a fork of 
[work by Sydney Nemzer](https://github.com/SidneyNemzer/elm-text-editor).
His [demo](https://sidneynemzer.github.io/elm-text-editor/), 
 inspired by prior work of Martin Janiczek, shows the 
feasibility of writing such a text editor and establishes an elegant and powerful foundation for future work.  Many kudos to Sydney.


This
[forked repo](https://github.com/jxxcarlson/elm-text-editor) adds 
scrolling, copy, cut, and paste, search and replace, text wrap,
and an API for embedding the editor in another app. 
Here are some examples which make use of the present library.

- [Demo-simple](https://jxxcarlson.github.io/app/editor-simple/index.html)

- [Demo](https://jxxcarlson.github.io/app/editor/index.html) This one
 implements external copy-paste: copy something somewhere with Cmd-C or
 whatever, then use ctrl-shift-V to paste it in the editor.
At the moment, external copy-paste only works in Chrome.

- [Markdown Example](https://markdown.minilatex.app/) The editor is 
hosted by an app that renders text written Markdown. The text may
include mathematics written in TeX/LaTeX.  The app features 
left-to-right sync:  doing ctrl-shift-S in the editor window 
(Left) synchronizes the source text with the rendered text (Right).
Still to do: right-to-left sync.  And much more.

## Running the examples

```bash
npm install

npm start
```


## Embedding the Editor

-  Use the `demo-simple` and `demo` apps of this repo as models, or consult
the [Markdown Example Code](https://github.com/jxxcarlson/elm-markdown/tree/master/app-demo-fancy)
- In order to implement external copy-paste (ctrl-shift V), 
the [Demo](https://jxxcarlson.github.io/app/editor/index.html) and 
[Markdown Example](https://markdown.minilatex.app/) apps import a module `Outside` into `Main`.  This module
uses ports and references `outside.js` in `index.html`


## Plans

- I would very much like this to be a community project; it is a tool that many of us can use to good end. I've posted some issues on the repo, and welcome comments, pull requests, and more issues.


- I may post a Road Map later, but [Sydney Nemzer's README](https://github.com/SidneyNemzer/elm-text-editor/blob/master/README.md) is an excellent place to begin.


## Credits

I would like to thank Folkert de Vries for help
improving the performance of the editor.


