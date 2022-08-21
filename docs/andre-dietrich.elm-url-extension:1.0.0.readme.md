# Elm-Url-Extension

This is a simple wrapper for the `elm/url` package that allows to use different
protocols than `http` and `https`. The `file` and `ftp` protocols are supported
by default, but as the example shows, you can also define your own custom types.

``` elm
import UrlExtension as URL

"ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html"
|> URL.fromStringWithProtocol ["ipfs", "custom"]
--> Just { fragment = Nothing, host = "bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq", path = "/wiki/Vincent_van_Gogh.html", port_ = Nothing, protocol = CUSTOM "ipfs", query = Nothing }

"ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html"
|> URL.fromStringWithProtocol ["ipfs", "custom"]
|> Maybe.map URL.toString
--> Just "ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html"
```

> **Note: For Url parsing it still uses the original functions from the `Url` module.**

## Future Work

Actually it would be great to use also the standards for other web protocols, such as `ftp`,
which allows for example to define `ftp://user:password@url.domain`. `@` symbols are not
allowed by `http?s` to be part of the hostname, thus this will not be parsed by this
package...