# `elm-bcp47-language-tag` [![Build Status](https://github.com/dillonkearns/elm-bcp47-language-tag/workflows/CI/badge.svg)](https://github.com/dillonkearns/elm-bcp47-language-tag/actions?query=branch%3Amain)

This package aims to help you build BCP 47 language tags with some type-safety.
It's important to note that just because a language tag is valid and correct
doesn't mean that it will be supported by browsers and tools. So building up a correct tag
with this package should give you added confidence but be sure to test the results.

## Project goals

- Provide a way to create valid BCP 47 tags with confidence that the result is well-formed and valid.
- The resulting Elm bundle will be able to include only the data that is explicitly referenced (for example, `LanguageTag.build Language.en { emptySubtags | region = Just Country.gb }` only includes the data for the English language and the Great Britain region, but doesn't cause your bundle to include data for French, Spanish, etc.)
- For unusual cases, there's an escape hatch (`LanguageTag.custom`) where you're on your own making sure you have a valid and meaningful value (much like the elm/html API). If you encounter a use case that isn't supported directly and requires this escape hatch, please open a GitHub issue to describe your use case to help me get context!
- This package is generated from a script with some data sources, so it can be relatively kept up-to-date through automation.

## Why it matters

- BCP 47 tags can be used in [the `lang` attribute in HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).
- `lang` attributes are [recommended by Lighthouse for the top-level `<html>` tag](https://web.dev/html-has-lang/)
- `lang` attributes can also be used for individual sections of a page, like `<p lang="en-GB">...</p><p lang="fr-CA">...</p>`
- Some CSS, like `text-transform`, relies on `lang` tags to determine how to apply capitalize, uppercase, etc. to the content. See <https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform>.
- Screen readers rely on `lang` attributes to determine how to pronounce the text. See <https://dequeuniversity.com/rules/axe/3.3/html-has-lang>.

## Out of scope for this package

The current goals for this project are to help you safely *construct* BCP 47 language tags, in a way that results in good dead-code elimination.

This package is not intended to help you *parse* BCP 47 language tags, or extract metadata or turn them into human-readable strings (like country name, language name, etc.).
See [`supermario/elm-countries`](https://github.com/supermario/elm-countries/) for a package that lets you find the country name for a given ISO 3166 country.

Here are some places that BCP 47 tags show up where this package's features are likely to not handle:

- The [`Intl` API in browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) uses BCP 47 language tags as locales for some functions
- [`navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) gives the current user's browser language in the BCP 47 format

Because this package is intended to *construct*, not *parse* BCP 47 tags, this package is not likely to be useful for working with those values.

Some reasons that these use cases don't fit into the package goals currently:

- Metadata, like country name, language name, etc. is more likely to change frequently. Hopefully the
  narrowly focused goal of this package will allow it to have less churn since it only changes the codes (like country code, language code, etc.) change.
  The package will not change and require an update when names or other metadata change.
- Turning a code, like a language code or country code, into a name, like a language name or a country name, requires including the data for all possible values in your
  bundle.

## Usage

```elm
import LanguageTag exposing (emptySubtags)
import LanguageTag.Language as Language
import LanguageTag.Country as Country
import LanguageTag.Script as Script
import LanguageTag.Variant as Variant

Language.no
    |> LanguageTag.build emptySubtags
    |> LanguageTag.toString
    --> "no"

Language.en
    |> LanguageTag.build  { emptySubtags | region = Just Country.gb }
    |> LanguageTag.toString
    --> "en-gb"

Language.zh
    |> LanguageTag.build  { emptySubtags | region = Just Country.tw }
    |> LanguageTag.toString
    --> "zh-tw"

Language.hy
    |> LanguageTag.build  
        { emptySubtags | 
          region = Just Country.it
        , script = Just Script.latn
        , variants = [ Variant.arevela ] 
        }
    |> LanguageTag.toString
    --> "hy-latn-it-arevela"

-- Chinese, Simplified script, as used in China
Language.zh
|> LanguageTag.build { emptySubtags | region = Just Country.cn, script = Just Script.hans }
    |> LanguageTag.toString
    --> "zh-hans-cn"
```

## Custom Tags

The following features and tag types are supported indirectly through the `custom` constructor that lets you supply your own custom string:

- [Schema extensions](https://github.com/wooorm/bcp-47#schemaextensions)
- [Private use](https://github.com/wooorm/bcp-47#schemaprivateuse)
- [Irregular tags](https://github.com/wooorm/bcp-47#schemairregular)

## Reference

- Learn more about the BCP 47 spec at <https://www.w3.org/International/questions/qa-choosing-language-tags>
