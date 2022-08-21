# Multipart

An elm package to build a multipart email as `String` with minimal dependencies, which can still be provided to
email delivery libraries like [choonkeat/elm-aws](https://package.elm-lang.org/packages/choonkeat/elm-aws/latest/AWS-SES#OutgoingMail)

```elm
Multipart.alternative (Multipart.boundary "boundary-string")
    |> Multipart.addStringPart "text/plain; charset=\"utf-8\"" textHeaders textContent
    |> Multipart.addStringPart "text/html; charset=\"utf-8\"" htmlHeaders htmlContent
    |> Multipart.string
```

## License

Copyright © 2021 Chew Choon Keat

Distributed under the MIT license.
