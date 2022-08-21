# Lime Reset 

Provides tags that include "reset" styles similar to
Yelp's [lemon-reset](https://github.com/Yelp/lemon-reset) library for React.


For an explanation of why Yelp originally moved away from relying on
page-global css resets and the benefits of including the resets opaquely
within tags, I recommend reading [this blog post](https://engineeringblog.yelp.com/2018/03/css-in-the-age-of-react.html)
from their engineering team.

Effectively these tags have  styling as if this stylesheet was applied to them.

```css
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

These tags use [elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/Css)
for their implementation. This is necessary because the stylesheet that is
being replicated makes use of the `:before` and `:after` css pseudo-selectors
in order to style the `blockquote` and `q` tags. As far as I am aware 
[it is impossible to use pseudo-selectors with inline css](https://stackoverflow.com/questions/5293280/css-pseudo-classes-with-inline-styles),
so making an inline stylesheet with (as is done by elm-css) is the only way
to make these tags in a redistributable way. As a consequence, these tags do not produce 
the [`Html msg`](https://package.elm-lang.org/packages/elm/html/latest/Html#Html)
from [`elm/html`](https://package.elm-lang.org/packages/elm/html/latest)
but instead make the [`Html msg`](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/Html-Styled#Html)
from [`rtfieldman/elm-css`](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest).