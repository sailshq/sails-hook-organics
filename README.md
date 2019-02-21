# sails-hook-organics

Exposes a set of commonly-used functions ("organics") as built-in helpers in your Sails app.

This package contains a set of hand-picked, trusted helpers recommended by the
Sails core team, and designed for use as your standard library when building
Node/Sails-based applications.

## Installation &nbsp; [![NPM version](https://badge.fury.io/js/sails-hook-organics.svg)](http://npmjs.com/package/sails-hook-organics)

```bash
npm install sails-hook-organics --save
```


## Usage

```js
var hashedPassword = await sails.helpers.passwords.hashPassword('keyboardcat');
var randomString = sails.helpers.strings.random();
```


## Available methods

```
.
├── flow
│   ├── build
│   ├── dive
│   ├── forEach
│   ├── pause
│   ├── simultaneously
│   ├── simultaneouslyForEach
│   └── until
│
├── strings
│   ├── ensureUniq
│   ├── random
│   ├── toStream
│   ├── template
│   └── uuid
│
├── http
│   ├── del
│   ├── get
│   ├── getStream
│   ├── patch
│   ├── post
│   ├── put
│   └── sendHttpRequest
│
├── process
│   ├── executeCommand
│   └── killChildProcess
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
    ├── chargeCustomer
    └── saveBillingInfo
```


<!--

Note:  Currently, the inclusion of "fs" is experimental, and deliberately
not documented here yet.  This is because, in most cases, you shouldn't be doing
stuff to the local filesystem in your production web server code.  That said,
there are plenty of valid use cases for this in builds, unrelated packages
and tools, etc- it just isn't worth it to include the methods in these docs
and potentially confuse people.

Here they are for posterity:

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

-->


## Where did all the rest go?

See [OTHER-USEFUL-METHODS.md](https://github.com/sailshq/sails-hook-organics/blob/a27db6c93e7333f5036a54ceb13a2e3b3fa0ae26/OTHER-USEFUL-METHODS.md) for information on how to use the many additional methods that are no longer included by default.


## Bugs &nbsp; [![NPM version](https://badge.fury.io/js/sails-hook-organics.svg)](http://npmjs.com/package/sails-hook-organics)

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

[![NPM](https://nodei.co/npm/sails-hook-organics.png?downloads=true)](http://npmjs.com/package/sails-hook-organics)


## Help

First, please check out the [relevant documentation](#usage).  If you are having trouble or have questions, click [here](http://sailsjs.com/support)!


<!--

## Advanced Usage

For compatibility, or for use outside of a Sails app, these helper definitions
can also be accessed directly:

```js
var organics = require('sails-hook-organics/accessible/dry');
// => raw definitions, like:
// {
//   …
//   stripe: {
//     description: 'Communicate with the Stripe API to charge credit cards, etc.',
//     methodDefsByIdt: {
//       saveBillingInfo: {
//         inputs: …,
//         exits: …,
//         fn: …
//       }
//     }
//   },
//   …
// }


var yourLibrary = function(slug){
  // …
  // For example of how to build these defs into Callables, see:
  // http://github.com/sailshq/sails-hook-organics/tree/v0.11.2
  // …
};
```



Then, e.g.:

```js
var hashedPassword = await yourLibrary('passwords').hashPassword('keyboardcat');
var randomString = yourLibrary('strings').random();
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

 -->


## FAQ

#### Why "organics"?

We refer to the kind of built-in helper provided by this hook as an "organic" helper, in the sense that it is something fundamental and inherent.
This hook is also "organic" in the sense that its helpers work kind of like genes-- when you use this hook in an app, you get all of its helpers,
even if you're not using some of them right away.  Finally, these helpers are also certified "organic" in that they have been hand-checked by
the Sails core team to make sure they're solid and up to date.  (Because we use them ourselves.)

#### Do I have to use this?

No, using this hook is completely optional.

The reason sails-hook-organics is extrapolated into a separate package, rather than being baked in to `sails`, is so that you can choose not to install it in your app-- i.e. if you don't need or want the functionality it provides, or if you'd prefer to do things differently.

Nevertheless, keep in mind that any particular helper you'd rather not use can always be superceded or overridden by an inline helper in your app.  For example, if you need to write your own algorithm for generating unique, pseudorandom string tokens, you might override `strings.random()` in your app (`api/helpers/strings/random.js`).  Or if you want to use Paypal instead of Stripe for billing, you might roll your own, separate `saveBillingInfo()` helper (`api/helpers/paypal/save-billing-info.js`).

> Note: In both customization examples mentioned above, the ideal approach (for interoperability's sake) would be to mimic the existing interface as much as possible (e.g. method names, inputs, & exits).  But really, that's icing on the cake.  This hook provides supplemental tools designed to make it faster and easier for you to build a stable, maintainable application.  It's up to you to build any other custom logic you need for your app-- and it's our job, as your framework, to get out of your way and let you do that.

#### I have an idea for how to improve...

We'd like to hear it!  The best way to share your ideas is to contribute (see below).

#### I wish this supported...

We are constantly looking for ways to improve this library. If we're missing something you need from a particular pack,
[come by to explain your use case](https://sailsjs.com/support) and we'll see what we can do.  If you're in a hurry, just create a fork or contact us about [professional support options](https://sailsjs.com/about).

#### Does this use semver?

3rd party dependency versions are pinned, and all releases of this package are carefully considered and tested to adhere to semantic versioning.

#### What does the future hold?

The roadmap for this package is flexible and we're open to ideas.  The important thing is that we remain relentlessly focused on stability and versatility,
while keeping the library relatively lightweight and the usage intuitive.  Secondary to that, most of the immediate-term
improvements we're interested in making are related to performance.

#### I'd like to help work on this.

Awesome!  Please have a read through the [contribution guide](http://sailsjs.com/contribute), if you haven't already.  If you're actively interested in helping to shape the future usage and roadmap for this library, we welcome your input!  Please [introduce yourself](https://sailsjs.com/contact), let us know a rough guess at the # of hours per week you'll be able to commit, and someone from the core team will contact you ASAP.

## License

This package, like the [Sails framework](http://sailsjs.com), is free and open-source under the [MIT License](http://sailsjs.com/license).
