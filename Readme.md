# Watergun

![water-gun](https://github.com/kristianmandrup/water-gun/raw/master/watergun.jpeg)

[Gun.js](http://gun.js.org/) extensions for working with Observables/Streams and CSP channels (ie. streams of data/events and flow control models)

## Install

`npm i -S water-gun`

## Use

Assuming Babel or similar transpiler setup (2017)

To add all chain methods:

```js
import Gun from 'gun/gun'
import water from 'water-gun'
water(Gun)
```

To control which chain methods to add:

```js
import {
  addObservables
} from 'water-gun'
addObservables(Gun, 'xstream')
```

Import individual chain modules

```js
import {
  xstream,
  rx
} from 'water-gun/dist/observable'
```

### Require (Node.js)

Using `require`

```js
const Gun = require('gun/gun')
require('water-gun')(Gun)
```

### Observable streams

Gun event handlers can be wrapped as Observables that produce streams of event data.
These methods are prefixed with `$` by convention.

[Observable](https://tc39.github.io/proposal-observable/) stream support is included for:
- [Rx](http://reactivex.io/rxjs/)
- [Zen](https://github.com/zenparsing/zen-observable)
- [Xstream](http://staltz.com/xstream/) for [Cycle.js](cycle.js.org)

Example: Rx.js

```js
// optional
let options = {
  log: true,
  op: 'live'
}

// alternatives:
//   $rx(node)
//   node.$rx()
let obs = $rx(node, options)

let subscription = obs
  .subscribe(x => {
    console.log({received: x})
  })
```

### CSP Channels: WIP

[CSP channel](https://github.com/ubolonton/js-csp/blob/master/doc/basic.md) also included :)

The main idea is outlined [here](http://swannodette.github.io/2013/08/24/es6-generators-and-csp)

CSP learning resources:

- [Introduction To CSP In Javascript](http://lucasmreis.github.io/blog/quick-introduction-to-csp-in-javascript/)
- [Using CSP As Application Architecture](http://lucasmreis.github.io/blog/using-csp-as-application-architecture/)


To start a process just pass a *generator* as a parameter to the `go` function.
By using the `yield` keyword, you can pause a process, freeing the main thread
Channels are queues. Whenever a process calls `take` on a channel, it pauses until a value is `put` into that channel.

Processes that put a value on a channel also pause until some other process uses take.
Because channels are queues, when a process takes from a channel, the value will not be available for other processes to take. One process puts, one process takes.
A channel can be buffered, which means that, for a given number of puts, a put will not make the process pause.

If the channel has a buffer of size 2, the third put will block the process, until someone takes from it.

See the `test/channel/` folder for some test examples:

```js
let size = 2
let buffer = csp.buffers.fixed(size)
// let buffer = csp.buffers.sliding(size)
// let buffer = csp.buffers.dropping(size)
// const promiseCh = csp.promiseChan();

// NOTE: optionally customize channel and buffer used
// let promiseCh = csp.chan(buffer)

promiseCh = $csp(node, {
  // channel: promiseCh, // will use fixed(2) buffer by default
  // buffer (a channel buffer instance or an object with size and type)
  // putOp (put or putAsync)
  // log: true,
  op: 'live',
  // only put on channel when node value has a num field
  condition: (val) => val.num // default condition always returns true
})

node.timed({
  maxNum, // max number when recursive iteration is aborted
  logging: true,
  cb: resolve
})

let num = 0
let condition = () => num < 5

// Please help improved this!!!
csp.go(function* () {
  while (condition()) {
    const value = yield csp.take(promiseCh)
    console.log('value', value)
  }
})
```

## Contributing

First install dependencies

`npm i`

### Compile/Build

The `gulpfile` is configured to use Babel 6.
All `/src` files are compiled to `/dist` including source maps.

Scripts:

- start: `npm start`
- build: `npm run build` (ie. compile)
- watch and start: `npm run watch`
- watch and build: `npm run watch:b`

### Run Tests

`npm test` or simply `ava test`

Run individual test: `ava test/channel/csp.test.js`

## License

MIT Kristian Mandrup