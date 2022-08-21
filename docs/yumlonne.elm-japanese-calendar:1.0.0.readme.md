# elm-japanese-calendar

A simple Japanese Calendar.
It can convert gregorian-date(YMDRecord) to Japanese Calendar.
And convert Japanese-era with year to Japanese Calendar.

Japanese Calendar object has era, japaneseYear, japaneseYearString, gregorianYear.

# example
```.elm
> import JapaneseCalendar as JC
> JC.ymd 2000 11 24 |> JC.fromYMD |> Result.map JC.toString
Ok "平成12年" : Result (List String) String

> JC.ymd 1000 1 1 |> JC.fromYMD |> Result.map JC.toString
Err ["Too past year! `1000` < 1868"]
    : Result (List String) String

> JC.fromEraWithYear "平成" 3 |> Result.map .gregorianYear
Ok 1991 : Result (List String) Int
```
