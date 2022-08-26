# xsrf-protection

This package helps you make [XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) protected HTTP requests.

This package was designed to be used with [servant-auth](https://hackage.haskell.org/package/servant-auth). However it should be compatible with any
backend that supports cookie based XSRF authentication.

You can find a complete example of an elm app and a servant-auth backend using XSRF tokens [here](https://github.com/3kyro/servant-auth-elm.git).
