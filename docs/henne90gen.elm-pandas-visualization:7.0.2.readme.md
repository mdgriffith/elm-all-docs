# Elm Pandas Visualization

This package is meant for easy interoperability between [pandas](https://pandas.pydata.org) and elm.

## Usage

The first step is to create a pd.DataFrame in python and expose it via REST endpoint (JSON formatted).
This can be done with this little snippet of code:

```python
class DataFrameJSONEncoder(JSONEncoder):
    def default(self, obj: Any) -> str:
        if isinstance(obj, pd.DataFrame):
            return loads(obj.to_json(orient='table'))
        return JSONEncoder.default(self, obj)

@app.route("/data")
def get_data():
    data = pd.DataFrame(...)
    return dumps(data, cls=DataFrameJSONEncoder)
```

Next up you want to create a DataFrame decoder in elm, to parse the JSON encoded data.

```elm
type alias MyDataPoint = 
    { x : Float
    , y : Float
    }

dataDecoder : Decoder (DataFrame MyDataPoint)
dataDecoder =
    DataFrame.dataFrameDecoder myDataPointDecoder

myDataPointDecoder : Decoder MyDataPoint
myDataPointDecoder =
    map2 MyDataPoint (field "x" float) (field "y" float)
```

The final step is to graph the data:

```elm
view : DataFrame MyDataPoint
view df =
    LineChart.singleLineChart
        ( 600, 300 )
        (LineChart.ValueMapper (\e -> e.x))
        (\e -> e.y)
        df
```
