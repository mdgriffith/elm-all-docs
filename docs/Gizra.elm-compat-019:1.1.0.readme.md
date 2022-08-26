[![Build Status](https://travis-ci.org/Gizra/elm-compat-019.svg?branch=master)](https://travis-ci.org/Gizra/elm-compat-019)

# elm-compat-019

This is a package for Elm 0.19 that allows you to reach into Elm's past.

You can use some of the old things from Elm 0.17's
[`elm-lang/core`](http://package.elm-lang.org/packages/elm-lang/core/4.0.0)
or Elm 0.18's [`elm-lang/core`](http://package.elm-lang.org/packages/elm-lang/core/5.1.1)
which were changed or dropped in Elm 0.19. Now, the best way to experience all
the goodness of Elm 0.19 is to actually modify your code. However, there are
cases in which you might want to keep using some "retro" features of Elm 0.17
or 0.18.  Perhaps they are handy for your particular scenario, or perhaps you
are maintaining some code that you need to compile in multiple versions of Elm.

So, this package may be of some assistance in those scenarios.

## API

For the detailed API, see the
[Elm package site](http://package.elm-lang.org/packages/Gizra/elm-compat-018/latest),
or the links to the right, if you're already there.

As you will see, the modules from old versions of `elm-lang/core` with changes
that can be ported to Elm 0.19 are included here with the Elm version as a
suffix. So, suppose you want to use the old `customDecoder` from the Elm 0.17
version of `Json.Decode`, you can do something like this:

    import Json.Decode017 exposing (customDecoder)

If you're maintaining some code for both Elm 0.17 and 0.19, then the necessary
change is then limited to the `import` statement -- in the Elm 0.17 version,
you'd just change the import to:

    import Json.Decode exposing (customDecoder)

One thing which doesn't quite work (but might be nice) is:

    import Json.Decode017 as Json
    import Json.Decode as Json

The problem is that each has an `andThen`, so `Json.andThen` becomes ambiguous.

However, if you're maintaining code for both Elm 0.17 and 0.19, you could do
something like the following.

    -- In the Elm 0.19 file, use the following imports:
    import Json.Decode as Json
    import Json.Decode017 as Json17

    -- In the Elm 0.17 file, use the following imports:
    import Json.Decode as Json
    import Json.Decode as Json17

Then, in the body of the either file, when you need something that is specific
to Elm 0.17, you can say something like `Json17.andThen`. In both cases, you'll
get the function you want.

If you also want to use some things that are specific to Elm 0.18 or Elm 0.19, you can
install [`Gizra/elm-compat-017`](http://package.elm-lang.org/packages/Gizra/elm-compat-017/latest)
in the Elm 0.17 project, and then do something like this:

    -- In the Elm 0.19 file, use the following imports:
    import Json.Decode as Json
    import Json.Decode as Json18
    import Json.Decode017 as Json17

    -- In the Elm 0.17 file, use the following imports:
    import Json.Decode as Json
    import Json.Decode as Json17
    import Json.Decode018 as Json18

If you do that, then you can say `Json18.andThen` or `Json17.andThen` in either
file, and in both cases you'll get the function you expect.

The basic idea is that if you install the appropriate version of
`Gizra/elm-compat-...` for your environment, you should be able to maniuplate
your import statements to access any of the function signatures that have been
back-ported or forward-ported.

Just to reiterate, none of this is standard operating procedure -- normally,
you will be best served by just updating everything to the latest version of
Elm.  So, this is just for the very few cases where it makes sense to work in
multiple versions of Elm at the same time.

## Installation

Try `elm-package install Gizra/elm-compat-019`

## Development

Try something like:

    git clone https://github.com/Gizra/elm-compat-019
    cd elm-compat-019
    npm install
    npm test
