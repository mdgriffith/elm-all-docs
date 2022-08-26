# Readability in Elm

This module calculates the readability of text.

At this point in time, it supports the [Dale–Chall readability formula](https://en.wikipedia.org/wiki/Dale-Chall_readability_formula) and the [Coleman-Liau readablility formula](https://en.wikipedia.org/wiki/Coleman-Liau_index)

It has been developed for and used in SEO Apps's [word counter tool](https://seoapps.dev/word-counter).

## Build

To update the DaleChall list of simple words, run the following:
```
cd build
npm i
node index.js
```

The commands above will generate an Elm file called DaleChallList.elm in your src folder by downloading the list of words and add plurals.