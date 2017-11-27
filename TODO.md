todo

• ~~Mailgun: change apiKey to secret~~
• ~~Mailgun: possibly change inputs:~~
  · ~~`to` instead of `toEmail`~~
  · ~~`from` instead of `fromEmail`~~
• ~~Stripe: change apiKey to secret~~
• ~~Stripe: change the method names and their inputs and their outputs prbly~~
• Publish 0.11
• Publish a patch w/ the readme saying that further efforts are in "sails-hook-essentials" now, so the npmjs.com page gets updated
• Verify that it would make sense for helpers to do serial usage by default too.  It probably does.
• Then make it sails-hook-essentials, add a note to the readme about the name change, and publish that as sails-hook-essentials@1.0.0-0.
• Have it wait until the helpers hook has finished and then inject helpers in all the spots if they're not already there instead of being a separate thing  (but add a fallback .stdlib() function to help people who were already using this)
• Add ability to configure top-level custom usage options for helpers in Sails itself,
  then have log a warning on lift and use the traditional way **if you have any helpers**
  AND **you don't have an arginStyle and execStyle explicitly set** (and in the warning
  recommend how to set it up in the old way to make the warning go away but still maintain
  compatibility).  But in the generator, inject explicit config files that set arginStyle: 'serial'
  and execStyle: 'natural'.  That way, helpers work like the essentials out of the box, and then
  the essentials can just be helpers.
• Update helpers docs and examples in particular



```js
await sails.helpers.stripe.saveBillingInfo()
```




// - - - - - - - - - - - - - - - - - - - - - - - -
var customerId = await stdlib('stripe').saveBillingInfo({
  paymentSource: 'agja8dsg8j28jeg2j',
  plan: 'pro',
  emailAddress: 'gaasddgs@example.com',
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  emailAddress: 'some.other.email@example.com'
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  paymentSource: 'a9d9hg1h3k13kad'
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  emailAddress: 'yet.another@example.com',
  plan: ''
});

stdlib('stripe').saveBillingInfo({
  stripeCustomer: customerId,
  paymentSource: ''
});
// - - - - - - - - - - - - - - - - - - - - - - - -





// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Other stuff to think about:
// ```
// billingIsAnnual: {
//   type: 'boolean',
//   defaultsTo: true
// },

// billingCardholderName: {
//   type: 'string'
// },

// billingCardBrand: {
//   type: 'string',
//   example: 'Visa'
// },

// billingCardLast4: {
//   type: 'string',
//   example: '4242'
// },

// billingCardExpMonth: {
//   type: 'number',
//   example: 11
// },

// billingCardExpYear: {
//   type: 'number',
//   example: 2023
// },

// stripeCustomerId: {
//   type: 'string'
// },
// ```
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
