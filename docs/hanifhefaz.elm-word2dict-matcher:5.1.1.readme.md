# word2dictMatcher
This package is developed for chat bot services, where the user enters any question and the libraries job is to find the most related answer to that question, defined in the QuestionsBank file.

If you need a chatbot to your website, this package is the best one to choose. The only thing you need is to define all your possible questions and answers in the QuestionsBank file.

Please note, that this is not a machine learning package and do not expect to produce answers based on some magic. It uses the Bag of Words algorithm and compares your question to the data already defined.

## How it works?
Once you entered your question to the chatbot, your question will be divided into words and stored as a Dict data structure. all stop words and symbols will be removed as well. Since the answers and questions you defined in your QuestionsBank are already divided into words and stored as dicts, therfore the package will only convert your question, that you enter. Then the package compares your question to the questions listed in your QuestionsBank. at least words have to be matched in any question in the QuestionsBank to return an answer. You will be notified if there are no matches.

## How to use:
If you decided to use this library in your chatbot, then the first thing you have to do is to edit the QuestionsBank file and add your own questions and answers.

Next you will have to define the types of your search string or your input question. You can define it as below or you can use an input box, or probably in a more advance way, based on your needs. This is nothing but the question that your customer will ask your chatbot.

```elm
init : Url Params -> Model
init { params } =
    {searchString = ""
    , searchResult = NotSearched
    }
    
type Msg
    = TypedSearch String
    | Search

type SearchResult
    = NotSearched
    | Searched (Maybe QuestionsBank.Answer)
```
And then you can call the functions from the package in your update like this:

```elm
update : Msg -> Model -> Model
update msg model =
    case msg of
        TypedSearch str ->
            { model | searchString = str }

        Search ->
            { model | searchResult = Searched <| Word2DictMatcher.findRelevantDict (model.searchString |> Word2DictMatcher.tokenize |> Word2DictMatcher.toHistogram) QuestionsBank.data }
```
A complete working example is located in the examples folder.

## Open to Contributions

Improve the current working example, or implement your own!

I need to implement a chat window same as in facebook messenger, with only simple functionalities such as entering question and by pressing enter or OK button the question will be inside the chat window and after the question is posted there, the answer will come under it and as this flow goes on, a scroll bar will appear in the chat window.

If you are interested in this, please contact me at any time, or leave a PR.

Thank You.
