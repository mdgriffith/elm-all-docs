# elm-broker

[![CircleCI](https://circleci.com/gh/ymtszw/elm-broker/tree/master.svg?style=svg)](https://circleci.com/gh/ymtszw/elm-broker/tree/master)

Data stream buffer for Elm application, inspired by [Apache Kafka](https://kafka.apache.org/).

## What is this?

- `Broker` is essentially a [circular buffer](https://www.wikiwand.com/en/Circular_buffer), internally using `Array`
- Read pointers (`Offset`) are exposed to clients, allowing "pull"-style data consumption, just as in Kafka
- Insert(`append`), `read`, and `update` all take _O(1)_
- A buffer is made of multiple `Segment`s. Buffer size (= number of `Segment`s and size of each `Segment`) can be configured
- When the whole buffer is filled up, a new "cycle" begins and old `Segment`s are evicted one by one

## Expected Usage

- A `Broker` accepts incoming data stream. &dagger;
- Several **consumers** reads ("pulls") data from the `Broker` individually, while maintaining each `Offset` as their internal states.
- Consumers perform arbitrary operations against acquired data, then read `Broker` again after previous `Offset`. Rinse and repeat.

&dagger;
It is possible to have multiple `Broker`s in your application for different purposes,
however you must be careful so that you do not mix up `Offset`s produced from one `Broker` to ones from others.
Since `Offset`s are only valid for their generating `Broker`.
Wrapping `Offset`s in phantom types is a possible technique to enforce this restriction.

## Remarks

- Technically, it can also perform _O(1)_ `delete`, but it is still unclear whether we want `delete` API
    - Original Kafka now [supports this as an admin command](https://github.com/apache/kafka/blob/trunk/core/src/main/scala/kafka/admin/DeleteRecordsCommand.scala)
- There are several major features I am interested in:
    - More sophisticated/efficient dump and reload. Current implementation is plain old `encode` and `decoder` pair,
      which is potentially inefficient for big-capacity `Broker`s.
    - Bulk append and bulk read
    - Callback mechanism around `Segment` eviction

## Development

Install Elm Platform.

```sh
$ elm make
$ elm-test                    # full test
$ elm-test tests/MainTest.elm # only light-weight tests
```

## License

Copyright &copy; 2018, [Yu Matsuzawa](https://github.com/ymtszw)

BSD-3-Clause
