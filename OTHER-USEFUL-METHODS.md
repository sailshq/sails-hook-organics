# Other useful methods

_documented on Nov 22, 2017 before pulling some/all of them out_


## Useful methods

These may or may not have been pulled out of the standard library, but they are useful in Sails apps and/or for misc. Node packages, so they're included here.

If you want to use any of these, just require the relevant machinepack.  (If you're unsure, come by https://sailsjs.com/support)


```
·
├── util/
│   ├── hash
│   ├── pretty-print
│   ├── require
│   └── whilst
│
├── urls/
│   ├── format
│   ├── is-url
│   ├── parse
│   └── resolve
│
├── strings/
│   ├── ensure-uniq
│   ├── random
│   ├── to-stream
│   └── uuid         «« though maybe just consolidate that as another `style` in random()
│
├── sockets/
│   └── connect-client-socket
│
├── reqres/
│   └── get-credentials
│
├── process/
│   ├── escape-as-command-line-opt
│   ├── execute-command
│   ├── kill-child-process
│   ├── open-browser
│   └── spawn-child-process
│
├── paths/
│   └── home
│
├── passwords/
│   ├── check-password
│   └── hash-password
│
├── mailgun/
│   ├── send-html-email
│   └── send-plaintext-email
│
├── json/
│   └── stringify-safe
│
├── http/
│   ├── del
│   ├── get-stream
│   ├── get-webpage-html
│   ├── get
│   ├── patch
│   ├── post
│   ├── put
│   └── send-http-request
│
├── gravatar/
│   └── get-image-url
│
├── fs/
│   ├── cp
│   ├── ensure-dir
│   ├── exists
│   ├── ls
│   ├── mkdir
│   ├── mv
│   ├── read-json
│   ├── read-stream
│   ├── read
│   ├── rmrf
│   ├── template
│   ├── write-json
│   ├── write-stream
│   └── write
│
├── emailaddresses/
│   └── is-email-address
│
├── datetime/
│   ├── format
│   ├── parse-date
│   ├── parse-time
│   ├── parse-timestamp
│   ├── parse
│   └── time-from
│
└── stripe/
    ├── cancel-subscription
    ├── capture-charge
    ├── create-account
    ├── create-charge
    ├── create-customer
    ├── create-source
    ├── delete-source
    ├── list-sources
    ├── retrieve-customer-details
    ├── retrieve-subscription-details
    ├── subscribe-customer
    ├── update-account
    ├── update-customer
    └── update-subscription
```



## Not really necessary when writing apps by hand Javascript code by hand, but important concepts nonetheless

The following wrapper methods are not really necessary when writing apps by hand (i.e. using Javascript code in a text editor), because you can use built-in operators, Node core libraries, Lodash, or features of the Sails framework to accomplish the same thing (or very nearly the same thing) with less typing and better performance.  But they're important concepts nonetheless!  So they're listed below:

```
·
├── waterline/
│   └── *  _(just use built-in methods from Sails)_
│
├── util/
│   ├── construct
│   ├── guarantee
│   ├── whilst
│   └── get-calculated-value
│
├── strings/
│   ├── at
│   ├── capitalize
│   ├── deburr
│   ├── is-valid-regex
│   ├── join
│   ├── length
│   ├── match
│   ├── match-global
│   ├── replace
│   ├── slice
│   ├── split
│   ├── template
│   ├── to-camel-case
│   ├── to-kebab-case
│   ├── to-lower-case
│   ├── to-upper-case
│   ├── trim
│   └── trunc
│
├── sockets/
│   ├── blast
│   ├── broadcast
│   ├── get-socket-id
│   ├── is-socket-request
│   ├── join
│   └── leave
│
├── sessionauth/
│   ├── check-login
│   ├── login
│   └── logout
│
├── sails/
│   ├── debug
│   ├── error
│   ├── get-configuration
│   ├── is-production
│   └── warn
│
├── reqres/
│   ├── get-request-header
│   ├── get-response-header
│   └── upload-files
│
├── paths/
│   ├── is-absolute
│   ├── join
│   ├── parse
│   └── resolve
│
├── numbers/
│   ├── is-numeric
│   └── to-number
│
├── math/
│   ├── abs
│   ├── add
│   ├── avg
│   ├── ceil
│   ├── divide
│   ├── e
│   ├── floor
│   ├── ln
│   ├── log
│   ├── max
│   ├── median
│   ├── min
│   ├── mod
│   ├── multiply
│   ├── pi
│   ├── pow
│   ├── random
│   ├── round
│   ├── sqrt
│   ├── subtract
│   └── sum
│
├── json/
│   ├── parse
│   └── stringify
│
├── ifthen/
│   ├── if-false
│   ├── if-then-finally-sync
│   ├── if-then-finally
│   └── if-true
│
├── http/
│   └── negotiate-http-status
│
├── fs/
│   ├── read-sync
│   ├── rmrf-sync
│   └── write-sync
│
├── dictionaries/
│   ├── add-key
│   ├── copy-key
│   ├── delete-key
│   ├── has
│   ├── keys
│   ├── merge
│   └── rename-key
│
├── datetime/
│   ├── now
│   ├── parse
│   ├── stringify
│   └── timestamp
│
├── console/
│   ├── error
│   └── log
│
├── booleans/
│   ├── and
│   ├── is-between
│   ├── is-booleanish
│   ├── is-defined
│   ├── is-equal
│   ├── is-falsy
│   ├── is-greater-than
│   ├── is-less-than
│   ├── is-not-equal
│   ├── is-truthy
│   ├── is-undefined
│   ├── not
│   ├── or
│   └── to-boolean
│
└── arrays/
    ├── concat
    ├── each
    ├── find-one
    ├── find-where
    ├── first
    ├── index-of
    ├── insert
    ├── last
    ├── length
    ├── map
    ├── nth
    ├── pluck
    ├── reduce
    ├── replace
    ├── reverse
    ├── sample-subset
    ├── sample
    ├── slice
    ├── sort-by
    ├── sort-custom
    ├── sort-numbers
    ├── sort-strings
    ├── uniq-by
    └── uniq
```



<!--

```
  ─ ├ └ │
```

-->


## Standalone usage

In the past, sails-stdlib simply worked like this:

```js
var stdlib = require('sails-stdlib');

var Gravatar = stdlib('gravatar'); // << just like doing `require('machinepack-gravatar');`
var Mailgun = stdlib('mailgun'); // << just like doing `require('machinepack-mailgun');`
```


But when things were consolidated, this changed somewhat.  Fortunately, you can still find and use all of the underlying packages.


#### Where's the code?

Each package in the standard library used to live in its own repository:

##### General
- [ifthen](https://github.com/treelinehq/machinepack-ifthen)
- [strings](https://github.com/treelinehq/machinepack-strings)
- [numbers](https://github.com/treelinehq/machinepack-numbers)
- [booleans](https://github.com/treelinehq/machinepack-booleans)
- [dictionaries](https://github.com/treelinehq/machinepack-dictionaries)
- [arrays](https://github.com/treelinehq/machinepack-arrays)
- [json](https://github.com/treelinehq/machinepack-json)
- [datetime](https://github.com/sgress454/machinepack-datetime/)
- [math](https://github.com/treelinehq/machinepack-math)
- [paths](https://github.com/treelinehq/machinepack-paths)
- [urls](https://github.com/mikermcneil/machinepack-urls)
- [emailaddresses](https://github.com/mikermcneil/machinepack-emailaddresses)

##### Scripts and NPM Packages
- [fs](https://github.com/mikermcneil/machinepack-fs)
- [http](https://github.com/mikermcneil/machinepack-http)
- [process](https://github.com/treelinehq/machinepack-process)
- [console](https://github.com/treelinehq/machinepack-console)
- [util](https://github.com/treelinehq/machinepack-util)

##### App Servers & Web APIs
- [waterline](https://github.com/treelinehq/machinepack-waterline)
- [sockets](https://github.com/sgress454/machinepack-sockets)
- [reqres](https://github.com/mikermcneil/machinepack-reqres)
- [sessionauth](https://github.com/treelinehq/machinepack-sessionauth)
- [passwords](https://github.com/mikermcneil/machinepack-passwords)
- [mailgun](https://github.com/particlebanana/machinepack-mailgun)
- [gravatar](https://github.com/irlnathan/machinepack-gravatar)



#### Quick reference of implementation files

This isn't complete, but here's a chunk of them to demonstrate where to look:

- https://github.com/sailshq/machinepack-numbers/tree/cdbbccef1fa7e6cbc9549b2b70415c7316ebaa79/machines
- https://github.com/sailshq/machinepack-math/tree/e33233cc2129098b297eafc14c17dcf88f714244/machines
- https://github.com/particlebanana/machinepack-mailgun/tree/8b9113167c4af09022d8d77a4d0907f97c5badfe/lib
- https://github.com/sailshq/machinepack-json/tree/cb9b172d24d8a5f6a12f3ad63d95d6985fb2bd70/machines
- https://github.com/sailshq/machinepack-ifthen/tree/2faacb7c60a1d3f3118df7e585c1e228bc5a5940/machines
- https://github.com/mikermcneil/machinepack-http/tree/a6db8b1010819b78016be9ac376b2f48389bcef2/lib
- https://github.com/irlnathan/machinepack-gravatar/tree/de3e6607c59f354871af3b514808fa290838fb55/machines
- https://github.com/mikermcneil/machinepack-fs/tree/2b101233df58ab4a113e7da232502814ff851d01/machines
- https://github.com/sailshq/machinepack-emailaddresses/tree/f88649f4acfe428d31641e2abff718d9c86beeaf/machines
- https://github.com/sailshq/machinepack-dictionaries/tree/060809c406ace7d276027bc17a9abb6371c7aaa1/machines
- https://github.com/sgress454/machinepack-datetime/tree/7e4cb42fdd17f8e4eb7186579f6116282cc484cd/machines
- https://github.com/sailshq/machinepack-console/tree/ec09bcffcb89a446b3d3043b897094c266effeff/machines
- https://github.com/sailshq/machinepack-booleans/tree/ae639e06ca108fb930650ffa5b6546f3b8e596de/machines
- https://github.com/sailshq/machinepack-arrays/tree/fcb0f382ef9b5c546bf1c204bae13dc3bf2b4985/machines


#### Standalone usage example

```js
var Gravatar = require('machinepack-gravatar');
var Mailgun = require('machinepack-mailgun');


// Get a gravatar for an email address.
// (http://node-machine.org/machinepack-gravatar/get-image-url)
var imageUrl = Gravatar.getImageUrl({
  emailAddress: 'amy@gonzales-enterprises.com',
  gravatarSize: 400
}).execSync();


// Send an html email.
// (http://node-machine.org/machinepack-mailgun/send-html-email)
Mailgun.sendHtmlEmail({
  apiKey: 'key-3432afa32e9401482aba183c13f3',
  domain: 'sandbox5f89931913a9ab31130131350101.mailgun.og',
  fromEmail: 'harold@example.enterprise',
  fromName: 'Harold Greaseworthy',
  toName: 'Amy Gonzales',
  subject: 'Welcome, Amy!',
  htmlMessage: 'Amy,\nThanks for joining our community. If you have any questions, please don\'t hesitate to send them our way. Feel free to reply to this email directly.\n\nSincerely,\nThe Management'
}).exec(function (err) {
  if (err) {
    console.error('Failed to send email. Details:',err);
    return;
  }

  console.log('Email sent!');

});
```


<!--

"upgrade": "npm install machinepack-arrays@latest machinepack-booleans@latest machinepack-console@latest machinepack-datetime@latest machinepack-dictionaries@latest machinepack-emailaddresses@latest machinepack-fs@latest machinepack-gravatar@latest machinepack-http@latest machinepack-ifthen@latest machinepack-json@latest machinepack-mailgun@latest machinepack-math@latest machinepack-numbers@latest machinepack-passwords@latest machinepack-paths@latest machinepack-process@latest machinepack-reqres@latest machinepack-sessionauth@latest machinepack-sockets@latest machinepack-strings@latest machinepack-urls@latest machinepack-util@latest machinepack-waterline@latest machinepack-sails@latest --save --save-exact",
"upgrade-beta": "npm install machinepack-arrays@beta machinepack-booleans@beta machinepack-console@beta machinepack-datetime@beta machinepack-dictionaries@beta machinepack-emailaddresses@beta machinepack-fs@beta machinepack-gravatar@beta machinepack-http@beta machinepack-ifthen@beta machinepack-json@beta machinepack-mailgun@beta machinepack-math@beta machinepack-numbers@beta machinepack-passwords@beta machinepack-paths@beta machinepack-process@beta machinepack-reqres@beta machinepack-sessionauth@beta machinepack-sockets@beta machinepack-strings@beta machinepack-urls@beta machinepack-util@beta machinepack-waterline@beta machinepack-sails@beta --save --save-exact",
"upgrade-dev": "npm install machinepack-arrays@treelinehq/machinepack-arrays machinepack-booleans@treelinehq/machinepack-booleans machinepack-console@treelinehq/machinepack-console machinepack-datetime@sgress454/machinepack-datetime machinepack-dictionaries@treelinehq/machinepack-dictionaries machinepack-emailaddresses@mikermcneil/machinepack-emailaddresses machinepack-fs@mikermcneil/machinepack-fs machinepack-gravatar@irlnathan/machinepack-gravatar machinepack-http@mikermcneil/machinepack-http machinepack-ifthen@treelinehq/machinepack-ifthen machinepack-json@treelinehq/machinepack-json machinepack-mailgun@particlebanana/machinepack-mailgun machinepack-math@treelinehq/machinepack-math machinepack-numbers@treelinehq/machinepack-numbers machinepack-passwords@mikermcneil/machinepack-passwords machinepack-paths@treelinehq/machinepack-paths machinepack-process@treelinehq/machinepack-process machinepack-reqres@treelinehq/machinepack-reqres machinepack-sessionauth@treelinehq/machinepack-sessionauth machinepack-sockets@sgress454/machinepack-sockets machinepack-strings@treelinehq/machinepack-strings machinepack-urls@mikermcneil/machinepack-urls machinepack-util@treelinehq/machinepack-util machinepack-waterline@treelinehq/machinepack-waterline machinepack-sails@treelinehq/machinepack-sails --save --save-exact"

-->


## Discussed for future

See also https://trello.com/c/RNm3HqYh


```
…
│
├── flow/
│   ├── build   «« like reduce but more flexible
│   ├── dive
│   ├── each
│   ├── map
│   ├── simultaneously
│   ├── pause
│   └── whilst
│
…
```



### Examples

```
await sails.for(things, async(thing)=>{ /*…*/ })
```

And:

Like reduce:
```js
var result = await sails.build(initialValue, async(memo)=>{
  /*… (loop here if you want, up to you) …*/
  return memo;
});
```

Or alternatively just leave it `undefined`:
```js
var result = await sails.build(async(memo)=>{
  /*… (loop here if you want, up to you) …*/
  return memo;
});
```

Formally:
```usage
await sails.recursively(initialSnowball, recursiveStep(snowball, recurse))
```

Or less formally:
```usage
await sails.dive(initialLoot, firstDive(lootSoFar, dive))
```

```js
// Compute 50th value of the fibonacci sequence:
var result = await sails.dive(50, async (loot, dive)=>{
  if (loot<= 1) { return 1; }
  return await dive(loot - 1) + await dive(loot - 2);
});
```


Another way maybe:
```js
// Compute 50th value of the fibonacci sequence:
var result = await sails.recursively(50, async (soFar, recurse)=>{
  if (soFar<= 1) { return 1; }
  return await recurse(soFar - 1) + await recurse(soFar - 2);
});
```

```js
await stdlib('flow').until(async()=>{
  if (await User.count() > 30) {
    return true;
  }
  await stdlib('flow').pause(30000);
});
```


```js
customizedStdlib('flow').simultaneously({ x: async()=>3, y: ()=>-97, z: async()=>{  await customizedStdlib('flow').pause(500); return 14; }, p: async()=>{  await customizedStdlib('flow').pause(400); return 14; } }).log()
```

```js
customizedStdlib('flow').until(async()=>{ await customizedStdlib('flow').pause(1000); return (Math.random()>0.5?true:false); }).log()
```

