# Readability in Elm

This module exposes the list of valid TLDs as defined by iana.org here: [https://data.iana.org/TLD/tlds-alpha-by-domain.txt](https://data.iana.org/TLD/tlds-alpha-by-domain.txt).

Used to validate the domain field of SEO Apps's [keyword rank checker](https://seoapps.dev/keyword-rank).

## Build

To update the TLDs list, run the following:
```
cd build
node index.js
```

The commands above will generate an Elm file called TLDs.elm in your src folder by downloading the list of TLDs from iana.org.