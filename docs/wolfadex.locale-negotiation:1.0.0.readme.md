# locale-negotiation

`locale-negotiation` helps with selecting the most optimal locale primarily for use in localization, and based off the work of [@fluent/langneg](https://github.com/projectfluent/fluent.js/tree/master/fluent-langneg).

## Example usage

```elm
import Localization.Negotiation

Localization.Negotiation.filter
	{ requestedLocales =  [ "de-DE", "fr-FR" ]
	, availableLocales = [ "it", "de", "en-US", "fr-CA", "de-DE", "fr", "de-AU" ]
	, defaultLocale = Nothing
	}
-- gives you
-- [ "de-DE", "fr" ]
```

## Liekly subtags

There's a minimal built in list of list of likely subtags data, which is useful in finding most likely available locales in case the requested locale is too generic.

An example of that scenario is when the user requests `en` locale, and the application supports `en-GB` and `en-US`.

## Prior art

This package is based off the work of of [Project Fluent](https://projectfluent.org/), specifically [@fluent/langneg](https://github.com/projectfluent/fluent.js/tree/master/fluent-langneg).