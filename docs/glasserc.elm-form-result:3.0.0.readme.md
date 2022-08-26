## elm-form-result

Yet another form helper library.

This library is a set of small utilities for handling forms in HTML.

The Form.Result philosophy:

- As much as possible, Form.Result leans into standard Elm types like
  `Result` and `Maybe`. This leads to flexibility (easy to use with
  whatever existing validation code you have) as well as making it a
  little easier to learn.
- Do just one thing. Form.Result does not try to render HTML or save
  you from having to write "boilerplate" update messages. If this is
  what you are after, you might like
  [composable-form](https://package.elm-lang.org/packages/hecrj/composable-form/latest/).
- Generic. Form.Result doesn't care what your error types are, how
  many you have, whether you re-use them, etc.

The main type is in Form.Result (which see), with some subsidiary
utilities in Form.Result.AnyJust and Form.Result.Utils. Each module
should be documented clearly enough to just dive in and start using it
if you like. There is also a complete example of a form using this
library available in the `examples` directory. Finally, the rest of
this README may provide some of the context that informs the design of
the library.

## Overview

Here's the model of forms that this library assumes:

You have some data which is editable via an HTML form. For example,
let's consider a form that lets a user review a movie: a one-line
summary of their opinion that you enter into an `<input>`, a rating
from 1-10 that is entered into an `<input>`, a longer review which is
entered into a `<textarea>`, etc.

You also have some type that tracks the current state of that HTML
form. We'll call this your *form data* type. The contents of this form
data type are tied to the HTML structure of the form and its
fields. For example, in the "movie review" situation, your form data
probably has a `String` for the value of the `<input>` where the user
has typed their one-line summary. Your form data also tracks the
rating as a `String`, even though you want the user to type a number!
This is because the contents of the form belong to the user, not to
you -- your form data type has to track exactly what they entered.

At some point, you hope to turn this form data into some "clean" Elm
type. Let's call this your *output* type. The contents of this type
are tied to a pure-Elm description of the domain object you want to
have. For example, you'd probably want to have a `MovieReview` type,
with `summary : String` and `rating : Int`.

The contents of the form may not correspond to a valid value of the
output type. For example, the user may have typed "hi" in the rating
field. There may be other reasons you want to reject the contents of
the form -- for example, you may wish not to accept any review that
doesn't have something in the summary field. This process of examining
the contents of your form type and trying to turn it into an output
type is called *validation*.

Although you often have one field in your form type for each field in
your output type, that isn't necessarily the case. As a simple
example, you might have a "timestamp" field in your output type that
the user enters using a "date" and "time" field in your form type.

If validation fails, you should display the form augmented with the
problems each field has. There's an asymmetry here -- validation fails
as soon as any one field has problems, but instead of just showing the
problems with that one field, you want to gather all the problems on
all the fields, so that the user can correct them all.

How do we track the problems? We create another type, which we'll call
your *form error type*. The fields in this type correspond to some
combination of the fields in your HTML form and the reasons they might
be rejected. In our movie review example, we'd have a
`MovieReviewErrors` type with a field called `rating : RatingError`,
which parallels the `rating` field in our form type.

(Instead of a separate error type, some people like to change their
form type -- augment each field with some kind of error status. The
advantage here is that it's much easier to remember to render errors
and clear them as the corresponding field gets modified, because the
error status is "attached" to the field data. However, keeping errors
in a separate type makes it a little more obvious whether the form has
been validated already and whether there are any errors outstanding
that the user has to address (see "clearing errors" below). It's also
a little clearer when you have to present errors that aren't tied
specifically to a single form field (see "bad combination"
below). `elm-form-result` is meant for use with a form error type.)

Some people like to use `String`s as the possible errors, but I prefer
a distinct type for each field to try to make it harder to
accidentally show the wrong error with the wrong field. It can feel a
little heavy to create a type for each field, and sometimes you can
share an error type for two fields if they have the same validation
conditions, but in my experience, it's rare that even two fields have
exactly the same error situations.

`Form.Result` exists to make it easier to write functions like
`validateForm : FormState -> Result FormErrors OutputType`. It does
this by letting you write a monadic sort of expression that looks a
little like a JSON decoder. Instead of building up just your
`OutputType`, it builds up both your `FormErrors` and your
`OutputType` at the same time by adding fields to both at the same
time. Take a look at the `Form.Result` documentation for more details
on that.

## Clearing errors

So now we have a form type, and a form error type. Initially, we
haven't validated anything, so we have no error information, so our
form error type is probably wrapped in a `Maybe` -- we start out with
`Nothing`, and get `Just errors` once we validate. We can use the fact
that our error type is `Nothing` to know that nothing is wrong with
our form, and if it's `Just`, that means the user has errors to
correct. (We might use this information to disable submission until
all errors are fixed, or to add styling to the form to indicate that
correcting information is necessary.)

Our view renders a form with fields populated from our form type and
errors coming from the corresponding fields in the form error
type. The user will probably try to edit these fields to correct the
errors. Until we validate again, we don't know whether the new field
values are still bad or not, and it leads to a bad user experience to
tell the user that the field contents are bad if they might not be. So
as we update our form type fields, we also want to erase the
corresponding form error type fields.

As the user corrects all the fields, eventually we end up in a state
where although we have `Just errors`, but no field in `errors` is
still present (they're all `Nothing`). But this means we can no longer
rely on errors being `Just` to know that the user needs to correct
something. Instead, we have to examine every single field in the error
type. If no fields are `Just`, then we can safely discard the `Just
errors` and turn it back into `Nothing`.

The `Form.Result.AnyJust` module provides a mechanism to define
functions of the form `FormErrors -> Maybe FormErrors`. It works by
re-using the `FormErrors` constructor to ensure that we provide the
fields of the same number and type as are present in our form error
type. This makes it a little easier to ensure we're actually checking
every field in the form error type. See the module documentation for
more details.

## The "bad combination" problem

Sometimes you have situations where each individual field is valid but
the combination is not valid. As a simple example, a "confirm
password" field can be different from the "password" field, but it's
impossible to know which one has a typo. As a more complicated
example, "2:15 am" is a valid time, "2018-03-11" is a valid date, and
"America/New_York" is a valid timezone, but "2018-03-11 2:15 am in
America/New_York" doesn't exist (it's part of the daylight-savings
time "gap"). When we have situations like this, it's hard to associate
an error with a specific field. Some options for handling this:

- We could decide that when the combination is bad, we mark all fields
  in the combination with a "combination was bad" error. This is easy
  and it makes it natural to handle this error since we're probably
  already handling each individual field's errors. The downsides are
  that 1. displaying the error is tricky -- you probably don't need to
  tell the user twice that the combination is bad; and 2. clearing the
  error is also difficult -- when the user edits any of the fields in
  the combination, you have to check if the other fields were set to
  your "combination was bad" error, and clear them if they were.

- We could decide arbitrarily that when the combination is bad, it's
  the fault of one specific field, and mark just that one as having an
  error. For example, if the "password" and "confirm password" fields
  don't match, it's because the user didn't type their password
  correctly in the "confirm password" field.

  This means adding an error to just one field, so you don't have to
  worry about displaying the error twice. You can still handle
  rendering the error naturally simply by handling each field. You can
  also simplify your clearing logic since not matching is always the
  "confirm password" field's fault.

  This means that when the user edits the password field, even if it
  is now somehow the same as the "confirm password" field, the
  "confirm password" field is still wrong and needs to be edited. If
  you're happy with this user experience, then you don't have to do
  anything special to clear the "confirm password" field's
  error. Otherwise, we still have to go through some contortions to
  clear the field -- if the password is changed, we have to add a
  special-case check if the confirm password field had a "didn't
  match" error.

- We can add a new field to our form error type corresponding to the
  complete field. This field can get populated with errors in addition
  to the errors on each individual field. The advantage is that this
  makes it easier to clear the combined error -- any time you update
  any of the fields in the combination, you clear the combined error
  field. The disadvantage is that this field doesn't really fit
  naturally in your domain, and that makes it easy to forget to add
  code to render it in your view or even clear it in your update
  function.

Different teams may have different opinions on which of these
approaches is best, and different situations may call for different
solutions. Because `Form.Result` doesn't specify what fields are in
your form error type or what their values are, you're free to choose
as you like.

## Wait, what function do I want

This table provides a brief summary of the functions you can use to
add a field to a FormResult. I'd really rather put it in the module
documentation, but I couldn't figure out how to render a table in
Elmdoc. Leaving it here means it at least renders correctly on
[Github](https://github.com/glasserc/elm-form-result).

| Type to add    | Function to use  | Form fails validation if |
| -------------- | ---------------- | ------------------------ |
| Result err res | validated        | Result is Err            |
| Maybe err      | maybeErr         | Maybe is Just            |
| Maybe res      | maybeValid       | Maybe is Nothing         |
| Result err a   | checkErr         | Result is Err            |
| err, Maybe res | ifMissing        | Maybe is Nothing         |
| res            | unconditional    | never                    |
| err            | unconditionalErr | never                    |
