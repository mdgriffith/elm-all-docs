# TOTP

Elm implementation of [RFC6238](https://datatracker.ietf.org/doc/html/rfc6238).

### Demo

You can use this library with [pablohirafuji/elm-qrcode](https://package.elm-lang.org/packages/pablohirafuji/elm-qrcode/latest/) to generate a QR code for your user to setup their OTP authenticator devices:

<a href="https://elm-totp.netlify.app"><img style="max-width: 100%;" alt="Screenshot 2022-03-05 at 9 38 25 PM" src="https://user-images.githubusercontent.com/473/156885763-bc1340d5-f0a3-4ca8-af01-bc7497e0a974.png"></a>

Source code of the demo app can be found in [example](https://github.com/choonkeat/elm-totp/tree/main/example). Live demo of the app is hosted at [https://elm-totp.netlify.app](https://elm-totp.netlify.app)

### Backend

You can also use this library in the backend (for example [choonkeat/elm-webapp](https://github.com/choonkeat/elm-webapp) or [lamdera.com](https://lamdera.com)) to verify if a user input matches their OTP.

### Main Flow

1. Initialize a `Key` with a random `rawSecret`

    ```elm
    keyResult : Result String TOTP.Key.Key
    keyResult =
        TOTP.Key.init
            { issuer = "ACME Co"
            , user = "john@example.com"
            , rawSecret = "topsecret"
            , outputLength = Nothing
            , periodSeconds = Nothing
            , algorithm = TOTP.Algorithm.SHA1
            }
    ```

1. And generate a QR code using [pablohirafuji/elm-qrcode](https://package.elm-lang.org/packages/pablohirafuji/elm-qrcode/latest/) for your user to store in their authenticator app.

    ```elm
    view : TOTP.Key.Key -> Html msg
    view key =
        QRCode.fromString (TOTP.Key.toString key)
            |> Result.map (QRCode.toSvg [])
            |> Result.withDefault (text "Error while encoding to QRCode.")
    ```

1. [Backend] Save `Key` into your database by converting it into a `String`

    ```elm
    str = TOTP.Key.toString key
    ```

1. [Backend] Load `Key` from your database,

    ```elm
    maybeKey = TOTP.Key.fromString str
    ```

1. [Backend] Check if a user submitted String matches the OTP code.

    ```elm
    TOTP.Key.code now key == inputString
    ```

    _Note: `Key` should not be sent to the frontend when prompting users to enter OTP. Just take whatever OTP the user entered and verify in the backend._
