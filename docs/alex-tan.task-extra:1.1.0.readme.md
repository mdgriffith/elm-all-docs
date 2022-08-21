# task-extra

Contains map6, map7, map8, etc... for Tasks that are not included in the elm core library.

Example:

```elm
  Task.Extra.map6
      (\foo bar baz biz craz cray ->
          combineResults
            foo
            bar
            baz
            biz
            craz
            cray
      )
      fooTask
      barTask
      bazTask
      bizTask
      crazTask
      crayTask
```