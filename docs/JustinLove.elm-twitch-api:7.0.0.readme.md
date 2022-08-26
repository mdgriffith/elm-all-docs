# Elm Twitch Api

Decoders and a few other helpers for using [Twitch.tv APIs](https://dev.twitch.tv/docs/api/).

Partial coverage of the APIs I have used.

- Includes most the Helix (new Twitch API).
- Some additional decoders for unofficial hosts.

Most modules provide decoders for a specific api request. Notable exceptions include:

- `Twitch.Helix` - generic types and decoders
- `Twitch.Helix.Request` - HTTP request helper
- `Twitch.Kraken.Request` - HTTP request helper
- `Twitch.Template` - template url helpers

## Decoder Modules

Decoder modules provide stock decoders for each field in an api response. These decoders are usually trivial, and can be easily replaced if you want to decode as a different type. Most of them are of the form.

    id : Decoder UserId
    id = (field "id" Helix.userId)

The library provides:

- The correctly spelled field name (at least according to the test suite)
- A sensible basic decode type
- In a few cases, more complex decode types

Notably, video durations are of the form "1h22m33s", and the `Twitch.Helix.Video.duration` decoder returns it as milliseconds.

Most ids are numbers as strings; the library uses an aliased string with a custom name for documentation purposes, but treats the ids as opaque tokens.

### Decoder example

    import Twitch.Helix.User as User
    import Json.Decode exposing (..)

    users : Decoder (List User)
    users = User.response user

    user : Decoder User
    user =
      map3 User
        User.id
        User.login
        User.displayName

## Request helpers

    fetchUserByNameUrl : String -> String
    fetchUserByNameUrl login =
      "https://api.twitch.tv/helix/users?login=" ++ login

    fetchUserByName : String -> String -> Cmd Msg
    fetchUserByName auth login =
      Twitch.Helix.send <|
        { clientId = TwitchId.clientId -- your id
        -- I keep mine in a separate module
        -- so it can be excluded from version control
        , auth = auth
        , decoder = users -- your function, see above
        , tagger = User
        , url = (fetchUserByNameUrl login)
        }

## Example applications using this library:

- https://github.com/JustinLove/following_videos ([Following Videos](https://wondible.com/following_videos/)) (a bit obsolete)
- https://github.com/JustinLove/hostable ([Hostable](https://wondible.com/hostable/))
- https://github.com/JustinLove/hosting-clips ([Hosting Clips](https://wondible.com/hosting-clips/))
- https://github.com/JustinLove/schedule-from-videos ([Schedule From Videos](https://wondible.com/schedule-from-videos/))
- https://github.com/JustinLove/stream-credits ([Stream Credits](https://wondible.com/stream-credits/))
