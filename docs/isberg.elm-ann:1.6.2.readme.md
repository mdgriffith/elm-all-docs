# elm-ann
Artifical Neural Network (ANN) in Elm

Basic module for creating and activating Neural Networks in Elm, learning is not included (yet).

The repository is found at https://github.com/isberg/elm-ann

```elm
Network.create [(1, 0), (2, 0)] [(1, 2, -0.5)]
  |> Network.setValues [(1, -0.8)]
  |> Network.activate
  |> Network.toString
  -- == "Network [1=-0.8, 2=1] [(1, 2)=-0.5]"
```
