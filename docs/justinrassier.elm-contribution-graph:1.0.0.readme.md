# Elm Contribution Graph

GitHub-style contribution graph written in pure Elm. Shows a full calendar year at a time, which is slightly different than GitHub. Clicking on a day will show a list of contributions for that specific day.

**Note**
This uses the elm/time library which means there is technically some inaccuracies with historical data. This usually doesn't cause too much of an issue, but if a contribution in your data set is around midnight, then the time shift for daylights saving time can throw off the day. 


## Styling Needs
This uses elm-css to have the styling baked in. At this time there is no mechanism to customize the styling. I am hoping to get to adding some styling or theming support in the future!
