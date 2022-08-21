## Xy

Commonly, a tuple is used to describe 2 coordinates `( x, y )` of

  - a point
  - a dimension
  - a velocity
  - ...

examples:
  - [`Playground.polygon`](https://package.elm-lang.org/packages/justgook/webgl-playground/5.0.0/Playground#polygon), [`Playground.toXY`](https://package.elm-lang.org/packages/justgook/webgl-playground/5.0.0/Playground#toXY), ...

    ```elm
    polygon : Color -> List ( Float, Float ) -> Shape

    toXY : Keyboard -> ( Float, Float )
    ```
  - [`Collage.shift`](https://package.elm-lang.org/packages/timjs/elm-collage/latest/Collage#shift), [`Collage.polygon`](https://package.elm-lang.org/packages/timjs/elm-collage/latest/Collage#polygon), ...
    ```elm
    shift : ( Float, Float ) -> Collage msg -> Collage msg

    polygon : List ( Float, Float ) -> Shape
    ```

This package contains simple helpers to _create, transform & read 2-coordinate-tuples_.

> ... Or at least it did. Now wait here.
> 
> In retrospect: Is this really a good idea?
> 
> 1. descriptiveness: Do you prefer `( 3, 4 )` or `Dimensions { width = 3, height = 4 }`?
> 
> 2. units: Do you prefer `( 3, 4 )` or `fromTuple Pixels.int ( 3, 4 )`?
>    Enjoy your time with [elm-units](https://package.elm-lang.org/packages/ianmackenzie/elm-units/latest) and thank me later!
> 
> 3. safety: `Xy.normalize`, `Xy.direction`, ... should return a type that keeps its promise of `\xy -> (xy |> Xy.length) = 1`

> → [`Vector2d`](https://dark.elm.dmy.fr/packages/ianmackenzie/elm-geometry/latest/Vector2d), [`Point2d`](https://dark.elm.dmy.fr/packages/ianmackenzie/elm-geometry/latest/Point2d), [`Direction2d`](https://dark.elm.dmy.fr/packages/ianmackenzie/elm-geometry/latest/Direction2d), ...
> 
> [elm-geometry](https://dark.elm.dmy.fr/packages/ianmackenzie/elm-geometry/latest/) shows how to do it right.
> 
> What about the extra verbosity when converting to/from tuples?
> Cross that out of your head. explicitness >> verbosity.
> That's why you're here in elm land. Stay a little longer :)
> 
> → this package is @deprecated and won't be maintained further
> 
> On tuples, [`hayleigh-dot-dev/tuple-extra`](https://dark.elm.dmy.fr/packages/hayleigh-dot-dev/tuple-extra/latest/Tuple-Extra)
> will supply you with all you need. If not, throw a PR there.
> 
> If you ever find yourself writing a package yourself, here's some tips so you don't have to one day write this.
> - Focus on one thing: not all of these... dimensions, points, vectorial stuff, handling tuples where left = right, ...
> - Look up what people created before you. Helpful tools: [tarokuriyama's deep search](https://tarokuriyama.com/elmsearch/), [korban's catalog](https://korban.net/elm/catalog/)
> 
> Below an earlier example using this package.
> See where you would do things differently

```elm
import Xy exposing (Xy)

type alias Model =
    { playerPosition : Xy Float
    , playerVelocity : Xy Float
    }

update msg model =
    case msg of
        SimulatePhysics ->
            { model
                | playerPosition =
                    model.playerPosition
                        |> Xy.map2 (+) model.playerVelocity
                , playerVelocity =
                    model.playerVelocity
                        |> Xy.map ((*) 0.98)
                        |> Xy.mapY (\y -> y - 1)
            }

view { playerPosition } =
    Collage.circle 50
        |> Collage.filled (Collage.uniform Color.red)
        |> Collage.shift playerPosition
        |> Collage.Render.svg
```

another example

```elm
type alias Model =
    { windowSize : Xy Float }

init =
    ( { windowSize = Xy.zero }
    , Browser.Dom.getViewport
        |> Task.perform
            (.viewport >> Xy.fromSize >> Resized)
    )

subscriptions =
    Browser.Events.onResize
        (\w h ->
            Resized (( w, h ) |> Xy.map toFloat)
        )
```