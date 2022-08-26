**Contacts for Support**
- @rupertlssmith on https://elmlang.slack.com
- @rupert on https://discourse.elm-lang.org

# elm-error-handling

This package aims to provide support for more advanced error handling, than `Result` alone provides.

In particular it defines a `ResultME` type which stands for result-with-multiple-errors. This is useful in situations where multiple errors can be detected in a single pass, and it is preferable to report all errors detected, and not to fail only on the first error.

Some examples; when parsing a form with multiple inputs and possibly multiple errors to report to the user; when parsing some source code which may contain multiple syntax errors.
