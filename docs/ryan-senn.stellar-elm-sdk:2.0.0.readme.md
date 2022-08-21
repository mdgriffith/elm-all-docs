# Stellar Elm SDK / API Examples

This repository started as a proof of concept that the [Elm Language](http://elm-lang.org) could be an excellent candidate as a Stellar SDK with its strong static types and excellent support for Http and Websockets.

This Repository used to host 2 things:
- A Stellar SDK written in Elm
- An Example SPA (single page application) written in Elm, that uses the SDK to interact with the Stellar Network.

The Demo SPA has now been extracted to it's [own package](https://github.com/ryan-senn/stellar-elm-demo), leaving only the SDK in this repository.

[The live Demo is hosted on GitHub Pages and can be found here](https://ryan-senn.github.io/stellar-elm-demo/).

## Usage

To add the SDK to your existing Elm project, run `elm package install ryan-senn/stellar-elm-sdk`.

The Package follows Stellar's philosophy as close as possible. The Package is split in Endpoints (to build and send requests) and Resources (responses from the Server).

The Endpoints have mandatory fields and optional fields. The mandatory fields have to be supplied to build a RequestBuilder instance. The optional fields can then be piped into the RequestBuilder, following a similar approach to [Luke's excellent http-builder package](https://github.com/lukewestby/elm-http-builder) or the highly successful [elm-decode-pipeline package by the folks at NoRedInk](https://github.com/NoRedInk/elm-decode-pipeline).

If you wanted to query offers for an account for example, you would start by providing the mandatory fields to the requestBuilder function:

```elm
import Stellar.Endpoints.OffersForAccount as OffersForAccount

requestBuilder =
  OffersForAccount.requestBuilder endpoint publicKey
```

This on itself is a valid RequestBuilder, which can be turned into a Command (Side Effect) using the send function:

```elm
cmd =
  OffersForAccount.requestBuilder endpoint publicKey
    |> OffersForAccount.send
```

However, you can also add any number of optional fields before turning the RequestBuilder into a Cmd:

```elm
cmd =
  OffersForAccount.requestBuilder endpoint publicKey
    |> OffersForAccount.setCursor cursor
    |> OffersForAccount.setLimit limit
    |> OffersForAccount.send
```   

## Future Plans

Now that the SDK is its own stand alone package hosted on the official elm (http://package.elm-lang.org/packages/ryan-senn/stellar-elm-sdk/latest) package library, I want to focus on stellar (!) documentation.

I also want to split Resource Modules in Public (exposed) and Private (internal), as there is very little reason to expose decoders, the Type Alias is enough (the Endpoint Modules use the decoders internally).

[The future plans for the Demo SPA can be foud here](https://github.com/ryan-senn/stellar-elm-demo#future-plans).
