# elm-handlebars
Elm-Handlebars is a dialect of the Handlebars templating language for Elm

It uses a template and a json input to generate a String.

    <p>{{firstname}} {{lastname}}</p>

A handlebars expression is a `{{`, some contents followed by a `}}`.
These expression will be then replaces with values from the json.

## Installation & First Steps

To install, type in `elm install Orasund/elm-handlebars`.
If you will need to work with json: `elm install elm/json`.

You can now start using the language by providing a json file and a template.alias

    case 
        "{"firstname":"Yehuda","lastname":"Katz"}"
        |> Json.Decode.decodeString Json.Decode.value
    of
        Ok value ->
            case
                value
                |> Handlebars.compile Handlebars.defaultConfig
                    "<p>{{firstname}} {{lastname}}</p>"
            of
            Just string ->
                string
            Err err ->
                err
                    |> Handlebars.errorToString
                
        Err err ->
            Json.Decode.errorToString err

## Elm-Handlebars vs. Handlebars.js

Elm-Handlebars is a subset of the original handlebars language.

Missing features are:

* **0-argument helpers**
  This way the name conflicts between helpers and fields are avoided
* **`each` block helper**
  It is functionally the same as a normal block but adding the feature would have broken the consistancy of helpers in general.
* **`with` block helper**
  There are a lot of oddities with this feature.
  
  1. It has its own syntax (introducing the `as` keyword) that does not really seam that useful.
  2. It can be abused to essentially a let expression (binding any constant value to a variable)
  3. The indended use, namely simplifing nested expressions, can be implemented with a simple helper without needing any special behaviour.
  
  Instead Elm-Handlebars ships with a different helper called the `inside` helper that can be used the change the context of a block.
* **`logs` expression helper**
  This helper would have been hard to implement. Though, it can be added quite easily as a custom helper. Therefore, its not included as a default helper.
* **Html escaping**
  Again, this can be done easily as a custom helper. Having it as a core feature assumes that the output target is Html.
* **Inline blocks**
  The original syntax is odd, to say the least. So instead Elm-Handlebars comes with an `inline` block helper.
* **Comments**
  No real reason. Please open an issue or create a PR if you need this feature.
* **Partical**
  Not included for time sake. Please open an issue or create a PR if you need this feature. 
* **The `else` expression**
  This expression is used very inconsistanly. The original intent surely was to make the syntax a bit nicer. But there are so many special cases, that adding this feature felt not really helpful.

  Instead Elm-Handlebars comes with a `not` expression helper that can produces the same results (maybe syntactically not as nice, but semantically very clear).
* **`@this` keyword**
  Can practically be replaced with `@index`
* **`raw` block**
  Can be replaced by a pre-processing language (like plain old Elm).
* **Literal segments**
  Please use pre-processing to rename any fields that use special characters. You can how ever use nummers to reference a specific element in a List.
* **Literal expressions**
  Again this should be done by pre-processing. Plans are to maybe have a way to provide template with a companion pre-processor. Open an issue or create a PR if you are interested in this feature.

## Contribute & Fund

If you need a new feature or found a bug, please open a new issue.
I will look at it whenever i've got time.

If the issue is really important to you, then you have two options.

* You can either create a PR yourself.
* Or donate some money via [issueHunt](https://issuehunt.io/r/Orasund/elm-handlebars) to increase the insentive for myself or someone else to tackle the problem for you.


