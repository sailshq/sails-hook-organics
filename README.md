# sails-stdlib

Standard library for Node/Sails applications.

This package contains a set of hand-picked, trusted modules recommended by the Sails core team.


## Installation &nbsp; [![NPM version](https://badge.fury.io/js/sails-stdlib.svg)](http://npmjs.com/package/sails-stdlib)

```bash
npm install sails-stdlib --save
```


## Usage

```js
var stdlib = require('sails-stdlib');
```

Or:
```js
sails.stdlib = require('sails-stdlib')
```


Then:

```js
var hashedPassword = await stdlib('passwords').hashPassword('keyboardcat');
var randomString = stdlib('strings').random();
```


### Custom usage

You can also customize your desired usage pattern:

```js
var stdlib = require('sails-stdlib').customize({arginStyle:'named', execStyle:'deferred'});

var hashedPassword = await sails.stdlib('passwords').hashPassword({
  password: 'keyboardcat'
});
var randomString = await sails.stdlib('strings').random();
// …
var anotherWayToGetRandomString = sails.stdlib('strings').random().now();
```

## Available methods

```
.
├── flow
│   ├── build
│   ├── dive
│   ├── each
│   ├── pause
│   ├── simultaneously
│   └── until
│
├── strings
│   ├── ensureUniq
│   ├── random
│   ├── toStream
│   └── uuid
│
├── fs
│   ├── cp
│   ├── ensureDir
│   ├── exists
│   ├── ls
│   ├── mkdir
│   ├── mv
│   ├── readJson
│   ├── readStream
│   ├── read
│   ├── rmrf
│   ├── writeJson
│   ├── writeStream
│   └── write
│
├── http
│   ├── del
│   ├── getStream
│   ├── get
│   ├── patch
│   ├── post
│   ├── put
│   └── sendHttpRequest
│
├── process
│   └── executeCommand
│
├── gravatar
│   └── getAvatarUrl
│
├── mailgun
│   └── sendHtmlEmail
│
├── passwords
│   ├── checkPassword
│   └── hashPassword
│
└── stripe
    ├── createCustomer
    ├── deleteSource
    ├── retrieveCustomerDetails
    └── updateCustomer
```


## Where did all the rest go?

See OTHER_USEFUL_METHODS.md for information on how to use the many additional methods that are no longer included by default.


## Bugs &nbsp; [![NPM version](https://badge.fury.io/js/sails-stdlib.svg)](http://npmjs.com/package/sails-stdlib)

To report a bug, [click here](http://sailsjs.com/bugs).  Someone will look into it ASAP.

In the mean time, if you see how to fix the problem and have a moment to prepare a patch, feel free to submit a pull request to the appropriate repo.  Thanks for taking the time to help out!

> We always welcome any patch with a bug fix, typo correction, performance enhancement, better error message,
> or that improves the readability of inline documentation/metadata/comments.
>
> But before submitting modifications to code, please be aware:
> With this project, we've tried really hard to keep things consistent between individual methods,
> and that means being vigilant about the effect of any usage change in the grand scheme of the library.
> Thus we can't merge any unsolicited PRs that contain _additive or breaking_ changes to usage (including
> new methods or options), without going through the process of submitting a proposal PR to the main Sails
> repo first.  See [**Contributing**](#contributing) below for more information.


## Contributing

Please observe the guidelines and conventions laid out in the [Sails project contribution guide](http://sailsjs.com/documentation/contributing) when opening issues or submitting pull requests.

[![NPM](https://nodei.co/npm/sails-stdlib.png?downloads=true)](http://npmjs.com/package/sails-stdlib)


## Help

First, please check out the [relevant documentation](#usage).  If you are having trouble or have questions, click [here](http://sailsjs.com/support)!


## FAQ

#### I have an idea for how to improve...

We'd like to hear it!  The best way to share your ideas is to contribute (see below).


#### I wish this supported...

We are constantly looking for ways to improve this library. If we're missing something you need from a particular pack,
[come by to explain your use case](https://sailsjs.com/support) and we'll see what we can do.  If you're in a hurry, just create a fork or contact us about [professional support options](https://sailsjs.com/about).

#### Does this use semver?

Dependency versions are pinned, and all releases of `sails-stdlib` are carefully tested to ensure strict semantic versioning.

#### What does the future hold?

The roadmap for this library is flexible and we're open to ideas.  The important thing is that we remain relentlessly focused on stability and versatility,
while keeping the library relatively lightweight and the usage intuitive.  Secondary to that, most of the immediate-term
improvements we're interested in making are related to performance.


#### I'd like to help work on this.

Awesome!  Please have a read through the [contribution guide](http://sailsjs.com/contribute), if you haven't already.  If you're actively interested in helping to shape the future usage and roadmap for this library, we welcome youre input!  Please [introduce yourself](https://sailsjs.com/contact), let us know a rough guess at the # of hours per week you'll be able to commit, and someone from the core team will contact you ASAP.


## License

This package, like the [Sails framework](http://sailsjs.com), is free and open-source under the [MIT License](http://sailsjs.com/license).
