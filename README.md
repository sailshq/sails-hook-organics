# stdlib

Framework-agnostic subset of [sails-stdlib](http://npmjs.org/package/sails-stdlib).

This package contains a lighter-weight, framework-agnostic subset of [sails-stdlib](http://npmjs.org/package/sails-stdlib) (a library of hand-picked modules recommended by the Sails core team).


## Installation

```bash
npm install stdlib --save
```


## Usage

```js
var stdlib = require('stdlib');
var EmailAddresses = stdlib('gravatar'); // << just like doing `require('machinepack-emailaddresses');`
var Gravatar = stdlib('gravatar'); // << just like doing `require('machinepack-gravatar');`
var Mailgun = stdlib('mailgun'); // << just like doing `require('machinepack-mailgun');`
```

### Documentation

See [`sails-stdlib#Documentation`](https://www.npmjs.com/package/sails-stdlib#Documentation).


### Exclusions

The following machinepacks **are not included** in `stdlib`:

+ `machinepack-sails`
+ `machinepack-sockets`
+ `machinepack-waterline`
+ `machinepack-reqres`
+ `machinepack-sessionauth`

> To use any of the additional packs above, install [`sails-stdlib`](https://www.npmjs.com/package/sails-stdlib)._

## FAQ

See [`sails-stdlib#FAQ`](https://www.npmjs.com/package/sails-stdlib#FAQ).


## License

MIT
