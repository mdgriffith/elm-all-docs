# Fable

Fable allows you to create a book (like a repository) of your html views, they are grouped as chapters, stories.

# Example of fable app

```
import Fable as Fable exposing (Book)
import Html.Styled exposing (div)

main : Book Msg
main =
    let
        chapters =
            [ Fable.chapter "Chapter 1"
                [ Fable.story "Story 1"
                    [ Fable.ui "test 1" (div [] []) ]
                ]    
            ]
    in
    Fable.app chapters
```

# Developpement

```
$ npm i
$ npm start
```


# Run example

```
$ cd example
$ npm i
$ npm start
```
